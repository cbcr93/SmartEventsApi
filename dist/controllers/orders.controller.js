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
const orderCreate_service_1 = __importDefault(require("../services/orders/orderCreate.service"));
const orderListAll_service_1 = __importDefault(require("../services/orders/orderListAll.service"));
const orderUpdate_service_1 = __importDefault(require("../services/orders/orderUpdate.service"));
class OrderController {
    static store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ticketId } = req.params;
            const { userId } = req;
            let data = req.body;
            data = Object.assign({ ticketId, userId }, data);
            const user = yield orderCreate_service_1.default.execute(data);
            return res.status(201).json(user);
        });
    }
    static index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            const { id } = req.params;
            const ticketId = id;
            const allTickets = yield orderListAll_service_1.default.execute(userId, ticketId);
            return res.status(200).json(allTickets);
        });
    }
    static show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { isPaid } = req.body;
            const data = { isPaid, id };
            const update = yield orderUpdate_service_1.default.execute(data);
            return res.status(200).json({
                message: "Ticket updated",
            });
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = OrderController;
