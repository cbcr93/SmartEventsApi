"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const errorHandler_middleware_1 = __importDefault(require("./middlewares/error/errorHandler.middleware"));
const routers_1 = __importDefault(require("./routers"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", routers_1.default);
app.use(errorHandler_middleware_1.default);
exports.default = app;
