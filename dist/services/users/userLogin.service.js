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
const data_source_1 = __importDefault(require("../../data-source"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_entity_1 = require("../../entities/user.entity");
const appError_1 = __importDefault(require("../../errors/appError"));
class LoginUserService {
    static execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password, login } = data;
            const userRepo = data_source_1.default.getRepository(user_entity_1.User);
            const user = yield userRepo.find();
            const findUseremail = user.find((user) => user.email === login);
            const findUsername = user.find((user) => user.username === login);
            let findUser;
            if (findUseremail) {
                findUser = findUseremail;
            }
            else if (findUsername) {
                findUser = findUsername;
            }
            else {
                throw new appError_1.default("Email or password invalid", 401);
            }
            const comparePasswordHash = yield bcryptjs_1.default.compare(password, findUser.password);
            if (!comparePasswordHash) {
                throw new appError_1.default("Email or password invalid", 401);
            }
            const generateToken = jsonwebtoken_1.default.sign({
                username: findUser.username
            }, String(process.env.JWT_SECRET_KEY), {
                expiresIn: "24h",
                subject: findUser.id,
            });
            return { accessToken: generateToken };
        });
    }
}
exports.default = LoginUserService;
