import AppError from "../../errors/appError";
import AppDataSource from "../../data-source";
import { Tickts } from "../../entities/tickts.entity";
import { User } from "../../entities/user.entity";

export default class  TicketsShowService {
    public static async execute(id : string){
        const ticketRepo = AppDataSource.getRepository(Tickts)
        const ticket = await ticketRepo.findOneBy({ id })
        if(!ticket){
            throw new AppError("Ticket not found", 404)
        }
        return ticket
    };
}
