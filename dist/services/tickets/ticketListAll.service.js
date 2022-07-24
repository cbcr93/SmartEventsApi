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
class TicketsListAllService {
    static execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const ticketsRepository = data_source_1.default.getRepository(tickts_entity_1.Tickts);
            const allticketss = yield ticketsRepository.find();
            const ticktList = allticketss.map((tickt) => {
                const returnedorder = {
                    id: tickt.id,
                    title: tickt.title,
                    category: tickt.category,
                    description: tickt.description,
                    price: tickt.price,
                    createdAt: tickt.createdAt,
                    updatedAt: tickt.updatedAt,
                };
                return returnedorder;
            });
            return ticktList;
        });
    }
}
exports.default = TicketsListAllService;
