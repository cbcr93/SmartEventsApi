"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_yup_middleware_1 = require("express-yup-middleware");
const users_controller_1 = __importDefault(require("../../controllers/users.controller"));
const users_1 = require("../../validations/users");
const loginRoutes = express_1.default.Router();
loginRoutes
    .route("")
    .post((0, express_yup_middleware_1.expressYupMiddleware)({ schemaValidator: users_1.loginValidator }), users_controller_1.default.login);
exports.default = loginRoutes;
