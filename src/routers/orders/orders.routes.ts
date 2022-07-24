import express from "express";
import OrderController from "../../controllers/orders.controller";

import AcessOwnerOrderMiddleware from "../../middlewares/acessOwnerOrder.middleware";
import AcessOwnerTicketsMiddleware from "../../middlewares/acessOwnerTickets.middlewares";
import AcessSellerAuthMiddleware from "../../middlewares/acessSellerAuth.middlewares";

const ordersRoutes = express.Router();

ordersRoutes
    .route("")
    .get(AcessOwnerOrderMiddleware, OrderController.index)

ordersRoutes
    .route("/seller/:id")
    .get(AcessOwnerTicketsMiddleware, OrderController.index)

ordersRoutes 
    .route("/:id")
    .patch(AcessSellerAuthMiddleware,OrderController.update)

export default ordersRoutes;