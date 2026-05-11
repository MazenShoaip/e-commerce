import { ObjectId } from "mongodb";
import { getDB } from "../db/db.js";

const dbCollection = (col) => getDB().collection(col);

export async function addItem(data, col) {
    if (data._id) data._id = new ObjectId(data._id);
    let items = dbCollection(col);
    return await items.insertOne(data);
}

export async function findItem(data, col) {
    if (data._id) data._id = new ObjectId(data._id);
    let items = dbCollection(col);
    return await items.findOne(data);
}
export async function updateItem(data, col) {
    if (data._id) data._id = new ObjectId(data._id);
    let items = dbCollection(col);
    return await items.updateOne({ _id: data._id }, { $set: data });
}

export async function findItems(data, col) {
    if (data._id) data._id = new ObjectId(data._id);
    let items = dbCollection(col);
    return await items.find(data).toArray();
}
export async function deleteItem(data, col) {
    if (data._id) data._id = new ObjectId(data._id);
    let items = dbCollection(col);
    return await items.deleteOne(data);
}
