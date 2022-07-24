"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orders_controller_1 = __importDefault(require("../../controllers/orders.controller"));
const acessOwnerOrder_middleware_1 = __importDefault(require("../../middlewares/acessOwnerOrder.middleware"));
const acessOwnerTickets_middlewares_1 = __importDefault(require("../../middlewares/acessOwnerTickets.middlewares"));
const acessSellerAuth_middlewares_1 = __importDefault(require("../../middlewares/acessSellerAuth.middlewares"));
const ordersRoutes = express_1.default.Router();
ordersRoutes
    .route("")
    .get(acessOwnerOrder_middleware_1.default, orders_controller_1.default.index);
ordersRoutes
    .route("/seller/:id")
    .get(acessOwnerTickets_middlewares_1.default, orders_controller_1.default.index);
ordersRoutes
    .route("/:id")
    .patch(acessSellerAuth_middlewares_1.default, orders_controller_1.default.update);
exports.default = ordersRoutes;
