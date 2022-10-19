import "reflect-metadata";
import "express-async-errors";
import express from "express";
import userRouter from "./routes/users.routes";
import loginRouter from "./routes/login.routes";
import handleErrorMiddleware from "./middlewares/handleError.middleware";
import propertiesRouter from "./routes/properties.routes";

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/login", loginRouter);
app.use("/properties", propertiesRouter);

app.use(handleErrorMiddleware);
export default app;
