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
const ticketCreate_service_1 = __importDefault(require("../services/tickets/ticketCreate.service"));
const ticketDelete_service_1 = __importDefault(require("../services/tickets/ticketDelete.service"));
const ticketListAll_service_1 = __importDefault(require("../services/tickets/ticketListAll.service"));
const ticketShow_service_1 = __importDefault(require("../services/tickets/ticketShow.service"));
const ticketUpdate_service_1 = __importDefault(require("../services/tickets/ticketUpdate.service"));
class TicketsController {
    static store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sellerId } = req;
            let data = Object.assign({}, req.body);
            if (sellerId) {
                data = Object.assign(Object.assign({}, data), { sellerId });
            }
            const tickets = yield ticketCreate_service_1.default.execute(data);
            return res.status(201).json(tickets);
        });
    }
    static index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allTickets = yield ticketListAll_service_1.default.execute();
            return res.status(200).json(allTickets);
        });
    }
    static show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const ticketById = yield ticketShow_service_1.default.execute(id);
            return res.status(200).json(ticketById);
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            let data = Object.assign({}, req.body);
            data = Object.assign(Object.assign({}, data), { id });
            const update = yield ticketUpdate_service_1.default.execute(data);
            return res.status(200).json({
                message: "Ticket updated",
            });
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield ticketDelete_service_1.default.execute(id);
            return res.status(200).json({ message: "User deleted" });
        });
    }
}
exports.default = TicketsController;
