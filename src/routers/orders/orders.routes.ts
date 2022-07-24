import express from "express";
import OrderController from "../../controllers/orders.controller";
import AcessAuthMiddleware from "../../middlewares/acessAuth.middleware";
import AcessOwnerTicketsMiddleware from "../../middlewares/acessOwnerTickets.middlewares";

const ordersRoutes = express.Router();

ordersRoutes
    .route("")
    .get(AcessAuthMiddleware, OrderController.index)
    

ordersRoutes
    .route("/seller/:id")
    .get(AcessOwnerTicketsMiddleware, OrderController.index)

ordersRoutes 
    .route("/:id")
    .patch(OrderController.update)

export default ordersRoutes;