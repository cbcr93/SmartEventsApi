import {Router} from "express";
import loginRoutes from "./login/login.routes";
import userRoutes from "./users/users.routes";

const routes = Router();
routes.use("/users", userRoutes);
routes.use("/login", loginRoutes);
   
export default routes;