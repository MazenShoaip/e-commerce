export async function addToken(data, col, db) {
    let token = db.collection(col);
    return await token.insertOne(data);
}

export async function findToken(data, col, db) {
    let token = db.collection(col);
    return await token.findOne(data);
}
export async function removeToken(data, col, db) {
    let token = db.collection(col);
    return await token.findOneAndDelete(data);
}

export async function findTokens(data, col, db) {
    let token = db.collection(col);
    return await token.find(data).toArray();
}
