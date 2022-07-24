import {Router} from "express";
import loginRoutes from "./login/login.routes";
import ordersRoutes from "./orders/orders.routes";
import ticketsRoutes from "./tickts/tickets.routes";
import userRoutes from "./users/users.routes";


const routes = require('express').Router();
routes.use("/users", userRoutes);
routes.use("/login", loginRoutes);
routes.use("/tickets", ticketsRoutes);
routes.use("/orders", ordersRoutes)
   
export default routes;

