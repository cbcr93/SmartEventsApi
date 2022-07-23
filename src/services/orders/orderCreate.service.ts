import AppDataSource from "../../data-source";
import { Tickts } from "../../entities/tickts.entity";
import { User } from "../../entities/user.entity";
import { Order } from "../../entities/orders.entity";
import AppError from "../../errors/appError";
import { ICreateOrder } from "../../interfaces/orders";
import { instanceToInstance } from "class-transformer";

export default class OrderCreateService {
    public static async execute(data: ICreateOrder){
    const { ticketId, buyerId } = data
    const ticketRepository = AppDataSource.getRepository(Tickts);
    const ticket = await ticketRepository.findOne({
        where: {
          id: ticketId,
        },
    });

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
        where: {
          id: buyerId,
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
        tickts: ticket as Tickts,
        user: user as User,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    await orderRepository.save(newOrder);

    return instanceToInstance(newOrder);
    };
}