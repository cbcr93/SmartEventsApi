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
const orders_entity_1 = require("../../entities/orders.entity");
const tickts_entity_1 = require("../../entities/tickts.entity");
class OrderUpdateService {
    static execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, isPaid } = data;
            const orderRepository = data_source_1.default.getRepository(orders_entity_1.Order);
            const orderArray = yield orderRepository.find();
            const order = orderArray.find((order) => order.id === id);
            if (!order) {
                throw new appError_1.default("Order not found", 404);
            }
            const ticketsRepo = data_source_1.default.getRepository(tickts_entity_1.Tickts);
            const allticketss = yield ticketsRepo.find();
            const ticket = allticketss.find(({ orders }) => {
                return orders.some((prop) => prop.id === id);
            });
            console.log(ticket === null || ticket === void 0 ? void 0 : ticket.amounts);
            if (!ticket) {
                throw new appError_1.default("Ticket not found", 404);
            }
            const newInfo = {
                isPaid
            };
            yield orderRepository.update(order.id, newInfo);
            const count = ticket.amounts - order.amountBuy;
            console.log(ticket.amounts);
            console.log(order.amountBuy);
            console.log(count);
            const newTicketInfo = {
                amounts: count,
            };
            yield ticketsRepo.update(ticket.id, newTicketInfo);
            return orderRepository;
        });
    }
}
exports.default = OrderUpdateService;
