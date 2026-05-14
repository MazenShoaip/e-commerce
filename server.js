// process.on("uncaughtException", (err) => {
//     console.error("UNCAUGHT EXCEPTION 💥:", err);
//     process.exit(1);
// });

import app from "#src/app.js";
import AppError from "#utils/appError.js";
async function startServer() {
    try {
        app.listen(5000);
        console.log("Server is Ready");
    } catch (err) {
        console.log("Server is not Ready");
        throw new AppError("Server Error", 500);
        // process.exit(1);
    }
}

await startServer();

// process.on("unhandledRejection", (err) => {
//     console.error("UNHANDLED REJECTION 💥:", err);
//     process.exit(1);
// });
