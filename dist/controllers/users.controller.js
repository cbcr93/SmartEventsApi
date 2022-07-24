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
const userDelete_service_1 = __importDefault(require("../services/users/userDelete.service"));
const userLogin_service_1 = __importDefault(require("../services/users/userLogin.service"));
const userUpdate_service_1 = __importDefault(require("../services/users/userUpdate.service"));
const usersCreate_service_1 = __importDefault(require("../services/users/usersCreate.service"));
const userShow_service_1 = __importDefault(require("../services/users/userShow.service"));
const usersListAll_service_1 = __importDefault(require("../services/users/usersListAll.service"));
class UserController {
    static store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const user = yield (0, usersCreate_service_1.default)(data);
            return res.status(201).json(user);
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const login = yield userLogin_service_1.default.execute(data);
            return res.status(201).json(login);
        });
    }
    static index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allUsers = yield usersListAll_service_1.default.execute();
            return res.status(200).json(allUsers);
        });
    }
    static show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const userById = yield userShow_service_1.default.execute(id);
            return res.status(200).json(userById);
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = req.body;
            data.id = id;
            const update = yield userUpdate_service_1.default.execute(data);
            return res.status(200).json({
                message: "User updated",
            });
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield userDelete_service_1.default.execute(id);
            return res.status(200).json({ message: "User deleted" });
        });
    }
}
exports.default = UserController;
