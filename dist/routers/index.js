"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_routes_1 = __importDefault(require("./login/login.routes"));
const orders_routes_1 = __importDefault(require("./orders/orders.routes"));
const tickets_routes_1 = __importDefault(require("./tickts/tickets.routes"));
const users_routes_1 = __importDefault(require("./users/users.routes"));
const routes = require('express').Router();
routes.use("/users", users_routes_1.default);
routes.use("/login", login_routes_1.default);
routes.use("/tickets", tickets_routes_1.default);
routes.use("/orders", orders_routes_1.default);
exports.default = routes;
