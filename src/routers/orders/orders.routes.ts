import express from "express";
import OrderController from "../../controllers/orders.controller";
import AcessAuthMiddleware from "../../middlewares/acessAuth.middleware";

const ordersRoutes = express.Router();

ordersRoutes
    .route("")
    

ordersRoutes
    .route("/:id")


export default ordersRoutes;