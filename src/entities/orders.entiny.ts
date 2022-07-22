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
import { User } from "./user.entiny";
import { Tickts } from "./tickts.entiny";

@Entity("order")
export class Order {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column()
    isPaid: boolean;

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

    
    @OneToOne((type) => Tickts, { eager: true })
    @JoinColumn()
    tickts: Tickts;


}