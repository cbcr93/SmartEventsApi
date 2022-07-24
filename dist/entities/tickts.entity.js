"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tickts = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const user_entity_1 = require("./user.entity");
const orders_entity_1 = require("./orders.entity");
let Tickts = class Tickts {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Tickts.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", width: 120, nullable: false, unique: true }),
    __metadata("design:type", String)
], Tickts.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", width: 50, nullable: false }),
    __metadata("design:type", String)
], Tickts.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", width: 256, nullable: false }),
    __metadata("design:type", String)
], Tickts.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], Tickts.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Tickts.prototype, "amounts", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: "created_at",
        type: "timestamp",
    }),
    __metadata("design:type", Date)
], Tickts.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: "updated_at",
        type: "timestamp",
    }),
    __metadata("design:type", Date)
], Tickts.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.ManyToOne)((type) => user_entity_1.User, (user) => user.tickts),
    __metadata("design:type", user_entity_1.User)
], Tickts.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => orders_entity_1.Order, (order) => order.tickts, { eager: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Tickts.prototype, "orders", void 0);
Tickts = __decorate([
    (0, typeorm_1.Entity)("tickts")
], Tickts);
exports.Tickts = Tickts;
