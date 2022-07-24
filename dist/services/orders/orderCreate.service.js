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
const tickts_entity_1 = require("../../entities/tickts.entity");
const user_entity_1 = require("../../entities/user.entity");
const orders_entity_1 = require("../../entities/orders.entity");
const appError_1 = __importDefault(require("../../errors/appError"));
const class_transformer_1 = require("class-transformer");
class OrderCreateService {
    static execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ticketId, userId, amountBuy } = data;
            const ticketRepository = data_source_1.default.getRepository(tickts_entity_1.Tickts);
            const ticket = yield ticketRepository.findOne({
                where: {
                    id: ticketId,
                },
            });
            const userRepository = data_source_1.default.getRepository(user_entity_1.User);
            const user = yield userRepository.findOne({
                where: {
                    id: userId,
                },
            });
            if (!user) {
                throw new appError_1.default("User not found", 404);
            }
            if (!ticket) {
                throw new appError_1.default("Ticket not found", 404);
            }
            const orderRepository = data_source_1.default.getRepository(orders_entity_1.Order);
            const isPaid = false;
            const newOrder = orderRepository.create({
                isPaid,
                amountBuy,
                tickts: ticket,
                user: user,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            yield orderRepository.save(newOrder);
            const returnOrder = {
                id: newOrder.id,
                isPaid: false,
                amountBuy: newOrder.amountBuy,
                createdAt: newOrder.createdAt,
                updatedAt: newOrder.updatedAt,
                tickts: {
                    id: newOrder.tickts.id,
                    title: newOrder.tickts.title,
                    category: newOrder.tickts.category,
                    description: newOrder.tickts.description,
                    price: newOrder.tickts.price,
                }
            };
            return (0, class_transformer_1.instanceToInstance)(returnOrder);
        });
    }
    ;
}
exports.default = OrderCreateService;
