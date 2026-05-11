import { getDB } from "../db/db.js";

const dbCollection = (col) => getDB().collection(col);

export async function addItem(data, col) {
    let items = dbCollection(col);
    return await items.insertOne(data);
}

export async function findItem(data, col) {
    let items = dbCollection(col);
    return await items.findOne(data);
}
export async function updateItem(data, col) {
    let items = dbCollection(col);
    return await items.updateOne({ _id: data._id }, { $set: data });
}

export async function findItems(data, col) {
    let items = dbCollection(col);
    return await items.find(data).toArray();
}
export async function removeItem(data, col) {
    let item = dbCollection(col);
    return await item.deleteOne(data);
}
