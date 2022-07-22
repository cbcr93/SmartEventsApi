import express from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import UserController from "../../controllers/users.controller";
import { loginValidator } from "../../validations/users";

const loginRoutes = express.Router();

loginRoutes
    .route("")
    .post(
        expressYupMiddleware({ schemaValidator: loginValidator}),
        UserController.login
    );

export default loginRoutes;