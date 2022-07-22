import express from "express";
import { Router } from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import UserController from "../../controllers/users.controller";
import { userCreateValidator } from "../../validations/users";

const userRoutes = express.Router();

userRoutes
    .route("")
    .get(UserController.index)
    .post(expressYupMiddleware({ schemaValidator: userCreateValidator}),
        UserController.store
        );

export default userRoutes;