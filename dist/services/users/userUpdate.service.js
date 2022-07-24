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
const appError_1 = __importDefault(require("../../errors/appError"));
const data_source_1 = __importDefault(require("../../data-source"));
const user_entity_1 = require("../../entities/user.entity");
class UserUpdateService {
    static execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, username, id } = data;
            const userRepo = data_source_1.default.getRepository(user_entity_1.User);
            const usersArray = yield userRepo.find();
            const user = usersArray.find((user) => user.id === id);
            if (!user) {
                throw new appError_1.default("User not found", 404);
            }
            const newInfo = {
                name,
                email,
                username,
            };
            yield userRepo.update(user.id, newInfo);
            return userRepo;
        });
    }
}
exports.default = UserUpdateService;
