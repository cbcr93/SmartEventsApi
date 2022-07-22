import {
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
    JoinTable,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn,
  } from "typeorm";
  import { v4 as uuid } from "uuid";
  import { Exclude } from "class-transformer";
import { Tickts } from "./tickts.entiny";
import { Order } from "./orders.entiny";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;
  
    @Column({ type: "varchar", width: 120, nullable: false, unique: true })
    name: string;
  
    @Column({ type: "varchar", width: 50, nullable: false })
    username: string;
  
    @Column({ type: "varchar", width: 256, nullable: false })
    email: string;
  
    @Exclude()
    @Column({ type: "varchar", width: 256, nullable: false })
    password: string;

    @Column()
    isSeller: boolean;

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

    @OneToMany((type) => Tickts, (tickts) => tickts.user, { eager: true })
    @JoinTable()
    tickts: Tickts[];

    @OneToMany((type) => Order, (tickts) => tickts.user, { eager: true })
    @JoinTable()
    orders: Order[];
}