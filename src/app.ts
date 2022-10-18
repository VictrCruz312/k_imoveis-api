import "reflect-metadata";
import "express-async-errors";
import express from "express";
import userRouter from "./routes/users.routes";
import loginRouter from "./routes/login.routes";
import handleErrorMiddleware from "./middlewares/handleError.middleware";

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/login", loginRouter);

app.use(handleErrorMiddleware);
export default app;
