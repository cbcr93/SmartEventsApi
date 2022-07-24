"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appError_1 = __importDefault(require("../errors/appError"));
const data_source_1 = __importDefault(require("../data-source"));
const tickts_entity_1 = require("../entities/tickts.entity");
const user_entity_1 = require("../entities/user.entity");
const AcessOwnerTicketsMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const token = req.headers.authorization;
    if (!token) {
        throw new appError_1.default("Missing Authorization token", 401);
    }
    const verifyToken = token === null || token === void 0 ? void 0 : token.split(" ")[1];
    if (!verifyToken || verifyToken.length <= 1) {
        throw new appError_1.default("Missing Authorization token", 401);
    }
    const secret = String(process.env.JWT_SECRET_KEY);
    const decoded = jsonwebtoken_1.default.verify(verifyToken, secret);
    const { sub } = decoded;
    const userRepository = data_source_1.default.getRepository(user_entity_1.User);
    const user = yield userRepository.findOne({
        where: {
            id: String(sub),
        },
    });
    const seller = user === null || user === void 0 ? void 0 : user.isSeller;
    const ticketRepo = data_source_1.default.getRepository(tickts_entity_1.Tickts);
    const ticket = user === null || user === void 0 ? void 0 : user.tickts.find((ticket) => ticket.id === id);
    if (!seller) {
        throw new appError_1.default("Missing Authorization token", 401);
    }
    if (!ticket) {
        throw new appError_1.default("Missing Authorization token", 401);
    }
    return next();
});
exports.default = AcessOwnerTicketsMiddleware;
