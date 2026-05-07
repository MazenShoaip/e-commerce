import express from "express";
import signupRoute from "./routes/signupRoute.js";
import errorsHandle from "./utils/errorsHandle.js";
import notFound from "./controllers/notFound.js";
import loginRoute from "./routes/loginRoute.js";
import verifyEmailRoute from "./routes/verifyEmailRoute.js";
import refreshVerifyEmailRoute from "./routes/refreshVerifyEmailRoute.js";

const app = express();
app.use(express.json());
app.use("/login", loginRoute);
app.use("/signup", signupRoute);
app.use("/otp/email", verifyEmailRoute);
app.use("/otp/refresh/email/", refreshVerifyEmailRoute);
app.use(notFound);
app.use(errorsHandle);

export default app;
