"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_yup_middleware_1 = require("express-yup-middleware");
const users_controller_1 = __importDefault(require("../../controllers/users.controller"));
const acessAuth_middleware_1 = __importDefault(require("../../middlewares/acessAuth.middleware"));
const users_1 = require("../../validations/users");
const userRoutes = express_1.default.Router();
userRoutes
    .route("")
    .get(users_controller_1.default.index)
    .post((0, express_yup_middleware_1.expressYupMiddleware)({ schemaValidator: users_1.userCreateValidator }), users_controller_1.default.store);
userRoutes
    .route("/:id")
    .get(acessAuth_middleware_1.default, users_controller_1.default.show)
    .patch(acessAuth_middleware_1.default, users_controller_1.default.update)
    .delete(acessAuth_middleware_1.default, users_controller_1.default.delete);
exports.default = userRoutes;
