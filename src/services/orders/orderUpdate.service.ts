import AppError from "../../errors/appError";
import AppDataSource from "../../data-source";

import { IUpdateOrder } from "../../interfaces/orders";
import { Order } from "../../entities/orders.entity";
import { Tickts } from "../../entities/tickts.entity";

export default class OrderUpdateService {
    public static async execute(data: IUpdateOrder){
        const { id, isPaid } = data
        const orderRepository = AppDataSource.getRepository(Order);
        const orderArray = await orderRepository.find();
        const order = orderArray.find((order) => order.id === id)
        
        if(!order){
            throw new AppError("Order not found", 404)
        }

        const ticketsRepo = AppDataSource.getRepository(Tickts)
        const allticketss = await ticketsRepo.find();
        
        
        const ticket = allticketss.find(({ orders }) => {
            return orders.some((prop) => prop.id === id);
        });

        console.log(ticket?.amounts)    

        if (!ticket) {
            throw new AppError("Ticket not found", 404);
        }

        const newInfo = {
            isPaid
        };

        await orderRepository.update(order!.id, newInfo);

        const count = ticket.amounts - order.amountBuy
        console.log(ticket.amounts)
        console.log(order.amountBuy)
        console.log(count)

        const newTicketInfo = {
            amounts: count,
        };
        await ticketsRepo.update(ticket!.id, newTicketInfo);

        return orderRepository
    }
}    