import {
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  import { v4 as uuid } from "uuid";
  import { Exclude } from "class-transformer";
import { User } from "./user.entiny";

@Entity("order")
export class Order {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column()
    isPaid: boolean;

    @OneToMany((type) => Tickts, (tickts) => tickts.order, { eager: true })
    tickts: Tickts[];

    @OneToMany((type) => User, (users) => users.orders, { eager: true })
    user: User;

    @Exclude()
    @ManyToOne((type) => User, (users) => users.orders)
    user: User; 


}