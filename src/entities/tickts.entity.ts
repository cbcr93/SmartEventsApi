import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
    OneToMany,
    JoinTable,
  } from "typeorm";
  import { v4 as uuid } from "uuid";
  import { Exclude } from "class-transformer";
import { User } from "./user.entity"
import { Order } from "./orders.entity";

@Entity("tickts")
export class Tickts {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;
  
    @Column({ type: "varchar", width: 120, nullable: false, unique: true })
    title: string;
  
    @Column({ type: "varchar", width: 50, nullable: false })
    category: string;
  
    @Column({ type: "varchar", width: 256, nullable: false })
    description: string;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    price: number

    @Column()
    amounts: number
  
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
    @ManyToOne((type) => User, (user) => user.tickts)
    user: User; 

    @OneToMany((type) => Order, (order) => order.tickts, { eager: true })
    @JoinTable()
    orders: Order[];

    

}