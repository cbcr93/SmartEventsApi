import { DeleteResult } from "typeorm";
import AppError from "../../../errors/appError";
import AppDataSource from "../../data-source";
import { Tickts } from "../../entities/tickts.entity";

export default class TicketDeleteService {
    public static async execute(id: string): Promise<DeleteResult> {
        const ticketRepo = AppDataSource.getRepository(Tickts);

        const ticketDelete = await ticketRepo.findOne({
            where: {
            id,
            },
        });
    
        if (!ticketDelete) {
            throw new AppError("Ticket not found", 401);
        }
        return ticketRepo.delete(id);
    }
}