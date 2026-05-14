import pool from "#src/database/database.js";
import format from "pg-format";

export async function addItem(data, relation) {
    let keys = Object.keys(data);
    let values = Object.values(data);
    let query = format(
        "INSERT INTO %I (%I) VALUES (%L) RETURNING id",
        relation,
        keys,
        values,
    );
    let result = await pool.query(query);
    return result;
}
export async function addItems(data, relation, chunkSize = 1000) {
    let keys = Object.keys(data[0]);
    let results = [];
    for (let i = 0; i < data.length; i += chunkSize) {
        let chunk = data.slice(i, i + chunkSize);
        let values = chunk.map((obj) => keys.map((k) => obj[k]));
        let query = format(
            "INSERT INTO %I (%I) VALUES (%L) RETURNING id",
            relation,
            keys,
            values,
        );
        let result = await pool.query(query);
        results.push(result.rows);
    }
    return results;
}

export async function findItem(data, relation, limit = "ALL", common = true) {
    let keys = Object.keys(data);
    let values = Object.values(data);
    if (keys.length === 0)
        return (await pool.query(format("SELECT * FROM %I", relation))).rows;
    if (limit !== "ALL" && isNaN(limit))
        throw new AppError("Limit must be a number", 500);
    let conditions = keys
        .map((k, i) => {
            return format("%I = %L", k, values[i]);
        })
        .join(` ${common ? "AND" : "OR"} `);
    let query = format(
        "SELECT * FROM %I WHERE (%s) LIMIT %s",
        relation,
        conditions,
        limit,
    );
    let result = await pool.query(query);
    return result;
}

export async function updateItem(data, filters, relation, common = true) {
    const dataKeys = Object.keys(data);
    const dataValues = Object.values(data);
    const setClause = dataKeys
        .map((k, i) => format("%I = %L", k, dataValues[i]))
        .join(", ");

    const filterKeys = Object.keys(filters);
    const filterValues = Object.values(filters);

    if (filterKeys.length === 0) {
        throw new AppError(
            "You must provide at least one filter to update a row safely.",
            500,
        );
    }

    const whereClause = filterKeys
        .map((k, i) => format("%I = %L", k, filterValues[i]))
        .join(` ${common ? "AND" : "OR"} `);
    let query = format(
        "UPDATE %I SET %s WHERE %s",
        relation,
        setClause,
        whereClause,
    );
    let result = await pool.query(query);
    return result;
}
export async function deleteItem(filters, relation, common = true) {
    const filterKeys = Object.keys(filters);
    const filterValues = Object.values(filters);

    if (filterKeys.length === 0) {
        throw new AppError(
            "You must provide at least one filter to delete a row safely.",
            500,
        );
    }

    const whereClause = filterKeys
        .map((k, i) => format("%I = %L", k, filterValues[i]))
        .join(` ${common ? "AND" : "OR"} `);
    let query = format("DELETE FROM %I WHERE %s", relation, whereClause);
    let result = await pool.query(query);
    return result;
}

export async function setCart(data) {
    let items = data.items;
    let user_id = data.user_id;
    for (let i of items) {
        if (!i.quantity) {
            await deleteItem({ product_id: i.product_id, user_id }, "carts");
            continue;
        }
        let item = (
            await findItem({ product_id: i.product_id, user_id }, "carts")
        ).rows[0];
        if (!item) {
            await addItem({ user_id, ...i }, "carts");
            continue;
        }
        await updateItem(
            { quantity: i.quantity },
            { id: item.id, user_id },
            "carts",
        );
    }
}
