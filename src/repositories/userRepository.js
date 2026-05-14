import pool from "#src/database/database.js";

async function getUsers() {
    return pool.query("SELECT * FROM users limit 1");
}

async function getUser(info) {
    return pool.query("SELECT * FROM users ");
}
console.log((await getUsers()).rows)