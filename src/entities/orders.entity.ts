import {
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
  } from "typeorm";
  import { v4 as uuid } from "uuid";
  import { Exclude } from "class-transformer";
import { User } from "./user.entity";
import { Tickts } from "./tickts.entity";

@Entity("order")
export class Order {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column()
    isPaid: boolean;

    @Column()
    amountBuy: number;

    @CreateDateColumn({
        name: "created_at",
        type: "timestamp",
    })
    createdAt: Date;
    
    @UpdateDateColumn({
        name: "updated_at",
        type: "timestamp",
    })
    updatedAt: Date;

    @Exclude()
    @ManyToOne((type) => User, (users) => users.orders)
    user: User;

    
    @ManyToOne((type) => Tickts, (tickets) => tickets.orders)
    tickts: Tickts;


}