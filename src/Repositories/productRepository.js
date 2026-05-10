export async function addProduct(data, col, db) {
    let products = db.collection(col);
    return await products.insertOne(data);
}

export async function findProduct(data, col, db) {
    let products = db.collection(col);
    return await products.findOne(data);
}
export async function updateProduct(data, col, db) {
    let products = db.collection(col);
    return await products.updateOne({ _id: data._id }, { $set: data });
}

export async function findProducts(data, col, db) {
    let products = db.collection(col);
    return await products.find(data).toArray();
}
