import express from "express";
import userRoutes from "./routers/users/users.routes";

const app = express();

app.use(express.json());
app.use("/users", userRoutes);

export default app;