import express from "express";
import cookieParser from "cookie-parser";
import errorsHandle from "#utils/errorsHandle.js";
import notFound from "#controllers/notFound.js";
import router from "#routes/router.js";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/', router)
app.use(notFound);
app.use(errorsHandle);

export default app;
