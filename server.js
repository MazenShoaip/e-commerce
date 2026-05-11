// process.on("uncaughtException", (err) => {
//     console.error("UNCAUGHT EXCEPTION 💥:", err);
//     process.exit(1);
// });

import connectDB from "#db/db.js";
import app from "./src/app.js";
import AppError from "#utils/appError.js";
async function startServer() {
    try {
        let db = await connectDB();
        // app.locals.db = db;
        app.listen(5000);
        console.log("Server is Ready");
    } catch (err) {
        // console.log("Server is not Ready");
        throw new AppError("Database Error", 500);
        // process.exit(1);
    }
}

await startServer();

// process.on("unhandledRejection", (err) => {
//     console.error("UNHANDLED REJECTION 💥:", err);
//     process.exit(1);
// });
