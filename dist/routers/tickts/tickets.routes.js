"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_yup_middleware_1 = require("express-yup-middleware");
const orders_controller_1 = __importDefault(require("../../controllers/orders.controller"));
const tickets_controller_1 = __importDefault(require("../../controllers/tickets.controller"));
const acessAuth_middleware_1 = __importDefault(require("../../middlewares/acessAuth.middleware"));
const acessOwnerTickets_middlewares_1 = __importDefault(require("../../middlewares/acessOwnerTickets.middlewares"));
const acessSellerAuth_middlewares_1 = __importDefault(require("../../middlewares/acessSellerAuth.middlewares"));
const tickets_1 = require("../../validations/tickets");
const ticketsRoutes = express_1.default.Router();
ticketsRoutes
    .route("")
    .post((0, express_yup_middleware_1.expressYupMiddleware)({ schemaValidator: tickets_1.ticketCreateValidator }), acessSellerAuth_middlewares_1.default, tickets_controller_1.default.store)
    .get(tickets_controller_1.default.index);
ticketsRoutes
    .route("/:id")
    .get(acessSellerAuth_middlewares_1.default, tickets_controller_1.default.show)
    .patch(acessOwnerTickets_middlewares_1.default, tickets_controller_1.default.update)
    .delete(acessOwnerTickets_middlewares_1.default, tickets_controller_1.default.delete);
ticketsRoutes
    .route("/:ticketId/order")
    .post(acessAuth_middleware_1.default, orders_controller_1.default.store);
exports.default = ticketsRoutes;
