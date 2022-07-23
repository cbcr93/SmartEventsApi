import express from "express";
import routes from "./routers";
import userRoutes from "./routers/users/users.routes";

const app = express();

app.use(express.json());
app.use("", routes);

export default app;