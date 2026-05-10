import express from "express";
import router from "./routes/router.js";
import errorsHandle from "./utils/errorsHandle.js";
import notFound from "./controllers/notFound.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/', router)
app.use(notFound);
app.use(errorsHandle);

export default app;
