import express from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import OrderController from "../../controllers/orders.controller";
import TicketsController from "../../controllers/tickets.controller";
import AcessAuthMiddleware from "../../middlewares/acessAuth.middleware";
import AcessOwnerTicketsMiddleware from "../../middlewares/acessOwnerTickets.middlewares";
import AcessSellerAuthMiddleware from "../../middlewares/acessSellerAuth.middlewares";
import { ticketCreateValidator } from "../../validations/tickets";

const ticketsRoutes = express.Router();

ticketsRoutes
    .route("")
    .post(
        expressYupMiddleware({ schemaValidator: ticketCreateValidator}),
        AcessSellerAuthMiddleware,
        TicketsController.store
    )
    .get(TicketsController.index);

ticketsRoutes
    .route("/:id")
    .get(AcessSellerAuthMiddleware, TicketsController.show)
    .patch(AcessOwnerTicketsMiddleware, TicketsController.update)
    .delete(AcessOwnerTicketsMiddleware, TicketsController.delete)

ticketsRoutes
    .route("/:ticketId/order")
    .post(
        AcessAuthMiddleware,
        OrderController.store
    )

export default ticketsRoutes;