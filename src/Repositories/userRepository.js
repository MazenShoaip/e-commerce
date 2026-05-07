export async function addUser(data, col, db) {
    let users = db.collection(col);
    return await users.insertOne(data);
}

export async function findUser(data, col, db) {
    let users = db.collection(col);
    return await users.findOne(data);
}
export async function updateUser(data, col, db) {
    let users = db.collection(col);
    return await users.updateOne({ _id: data._id }, { $set: data });
}

export async function findUsers(data, col, db) {
    let users = db.collection(col);
    return await users.find(data).toArray();
}
