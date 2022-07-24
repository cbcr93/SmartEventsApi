import { instanceToInstance } from "class-transformer";
import AppDataSource from "../../data-source";
import { Order } from "../../entities/orders.entity";
import { Tickts } from "../../entities/tickts.entity";
import { User } from "../../entities/user.entity";
import AppError from "../../errors/appError";

export default class  OrderListAllService {
    public static async execute(userId: string, ticketId: string){

        const userRepo = AppDataSource.getRepository(User)
        const user = await userRepo.findOneBy({ id: userId })
        if(!user){
            throw new AppError("User not found", 404)
        }

        const ticketsRepo = AppDataSource.getRepository(Tickts)
        const allticketss = await ticketsRepo.find();

        if(!user.isSeller){
  
            const orderList = user.orders.map((order) => {
                const actualTicket = allticketss.find(({ orders }) => {
                    return orders.some((prop) => prop.id === order.id);
                });

                const returnedorder = {
                    ...order,
                    ticket: {
                        id: actualTicket?.id as string,
                        title: actualTicket?.title as string,
                        category: actualTicket?.category as string,
                        description: actualTicket?.description as string,
                        price: actualTicket?.price as number,

                  },
                };
          
                return returnedorder;
              });


            return instanceToInstance(orderList);
        }

        const tickets = await ticketsRepo.findOneBy({ id: ticketId })
        
        if(!tickets){
            throw new AppError("User not found", 404)
        }

        return instanceToInstance(tickets);
    };
}
