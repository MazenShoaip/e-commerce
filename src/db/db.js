import { MongoClient } from "mongodb";
import { configDotenv } from "dotenv";
configDotenv();
export default async function connectDB() {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    // await client.db("ecommerce").dropDatabase();
    const db = client.db("ecommerce");
    await db
        .collection("pendingUsers")
        .createIndex({ createdAt: 1 }, { expireAfterSeconds: 300 });
    console.log("MongoDB connected");
    return db;
}
