import express from "express";
import { Router } from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import UserController from "../../controllers/users.controller";
import AcessAuthMiddleware from "../../middlewares/acessAuth.middleware";
import { userCreateValidator } from "../../validations/users";

const userRoutes = express.Router();

userRoutes
    .route("")
    .get(UserController.index)
    .post(expressYupMiddleware({ schemaValidator: userCreateValidator}),
        UserController.store
        );

userRoutes
    .route("/:id")
    .get(AcessAuthMiddleware, UserController.show)
    .patch(AcessAuthMiddleware, UserController.update)
    .delete(AcessAuthMiddleware, UserController.delete)

export default userRoutes;