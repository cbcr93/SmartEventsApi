import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  import { v4 as uuid } from "uuid";
  import { Exclude } from "class-transformer";
import { User } from "./user.entiny";

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

    @Column({ type: "integer", precision: 10, nullable: false })
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

}