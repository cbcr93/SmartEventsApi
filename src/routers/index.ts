import {Router} from "express";
import loginRoutes from "./login/login.routes";
import ticketsRoutes from "./tickts/tickets.routes";
import userRoutes from "./users/users.routes";

const routes = Router();
routes.use("/users", userRoutes);
routes.use("/login", loginRoutes);
routes.use("/tickets", ticketsRoutes);
   
export default routes;