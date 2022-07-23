import AppError from "../../errors/appError";
import AppDataSource from "../../data-source";
import { Tickts } from "../../entities/tickts.entity";
import { User } from "../../entities/user.entity";
import { IUpdateTicket } from "../../interfaces/tickts";

export default class TicketUpdateService {
    public static async execute(data: IUpdateTicket){
        const { title, price, description, amounts, category, id} = data;

        const ticketRepo = AppDataSource.getRepository(Tickts);
        const ticketArray = await ticketRepo.find();
        const ticket = ticketArray.find((ticket) => ticket.id === id)

        if(!ticket){
            throw new AppError("Ticket not found", 404)
        }
      
        const newInfo = {
            title,
            price,
            description,
            amounts,
            category,
        };
        await ticketRepo.update(ticket!.id, newInfo);

        return ticketRepo
    }
}    