import express from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import TicketsController from "../../controllers/tickets.controller";
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
    .patch(AcessSellerAuthMiddleware, TicketsController.update)
    .delete(AcessSellerAuthMiddleware, TicketsController.delete)

export default ticketsRoutes;