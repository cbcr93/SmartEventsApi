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
const class_transformer_1 = require("class-transformer");
const data_source_1 = __importDefault(require("../../data-source"));
const tickts_entity_1 = require("../../entities/tickts.entity");
const user_entity_1 = require("../../entities/user.entity");
const appError_1 = __importDefault(require("../../errors/appError"));
class OrderListAllService {
    static execute(userId, ticketId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepo = data_source_1.default.getRepository(user_entity_1.User);
            const user = yield userRepo.findOneBy({ id: userId });
            if (!user) {
                throw new appError_1.default("User not found", 404);
            }
            const ticketsRepo = data_source_1.default.getRepository(tickts_entity_1.Tickts);
            const allticketss = yield ticketsRepo.find();
            if (!user.isSeller) {
                const orderList = user.orders.map((order) => {
                    const actualTicket = allticketss.find(({ orders }) => {
                        return orders.some((prop) => prop.id === order.id);
                    });
                    const returnedorder = Object.assign(Object.assign({}, order), { ticket: {
                            id: actualTicket === null || actualTicket === void 0 ? void 0 : actualTicket.id,
                            title: actualTicket === null || actualTicket === void 0 ? void 0 : actualTicket.title,
                            category: actualTicket === null || actualTicket === void 0 ? void 0 : actualTicket.category,
                            description: actualTicket === null || actualTicket === void 0 ? void 0 : actualTicket.description,
                            price: actualTicket === null || actualTicket === void 0 ? void 0 : actualTicket.price,
                        } });
                    return returnedorder;
                });
                return (0, class_transformer_1.instanceToInstance)(orderList);
            }
            const tickets = yield ticketsRepo.findOneBy({ id: ticketId });
            if (!tickets) {
                throw new appError_1.default("User not found", 404);
            }
            return (0, class_transformer_1.instanceToInstance)(tickets);
        });
    }
    ;
}
exports.default = OrderListAllService;
