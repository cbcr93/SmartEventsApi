"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../../errors/appError"));
const errorHandlerMiddleware = (err, req, res, _) => {
    if (err instanceof appError_1.default) {
        return res.status(err.statusCode).json({
            status: "error",
            statusCode: err.statusCode,
            message: err.message,
        });
    }
    console.log(err);
    return res.status(500).json({ message: "Internal server error!" });
};
exports.default = errorHandlerMiddleware;
