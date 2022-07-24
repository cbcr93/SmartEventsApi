import AppDataSource from "../../data-source";
import { Tickts } from "../../entities/tickts.entity";
import { User } from "../../entities/user.entity";
import { Order } from "../../entities/orders.entity";
import AppError from "../../errors/appError";
import { ICreateOrder } from "../../interfaces/orders";
import { instanceToInstance } from "class-transformer";

export default class OrderCreateService {
    public static async execute(data: ICreateOrder){
    const { ticketId, userId, amountBuy } = data
    const ticketRepository = AppDataSource.getRepository(Tickts);
    const ticket = await ticketRepository.findOne({
        where: {
          id: ticketId,
        },
    });

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
        where: {
          id: userId,
        },
    });


    if(!user){
        throw new AppError("User not found", 404)
    }

    if(!ticket){
        throw new AppError("Ticket not found", 404)
    }

    const orderRepository = AppDataSource.getRepository(Order);

    const isPaid = false;

    const newOrder = orderRepository.create({
        isPaid,
        amountBuy,
        tickts: ticket as Tickts,
        user: user as User,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    await orderRepository.save(newOrder);

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
    }



    return instanceToInstance(returnOrder);
    };
}