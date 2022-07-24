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
const user_entity_1 = require("../../entities/user.entity");
const class_transformer_1 = require("class-transformer");
const appError_1 = __importDefault(require("../../errors/appError"));
const userCreate = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, username, isSeller, password } = data;
    const userRepository = data_source_1.default.getRepository(user_entity_1.User);
    const usersArray = yield userRepository.find();
    const emailAlreadyExists = usersArray.find((user) => user.email === email);
    const usernameAlreadyExists = usersArray.find((user) => user.username === username);
    if (emailAlreadyExists) {
        throw new appError_1.default("Email already exists.", 401);
    }
    if (usernameAlreadyExists) {
        throw new appError_1.default("Username already exists.", 401);
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 8);
    const newUser = userRepository.create({
        name,
        email,
        username,
        isSeller,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    yield userRepository.save(newUser);
    return (0, class_transformer_1.instanceToInstance)(newUser);
});
exports.default = userCreate;
