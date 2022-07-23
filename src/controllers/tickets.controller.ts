import { Request, Response } from "express";
import TicketCreateService from "../services/tickets/ticketCreate.service";
import TicketDeleteService from "../services/tickets/ticketDelete.service";
import ticketsListAllService from "../services/tickets/ticketListAll.service";
import TicketsShowService from "../services/tickets/ticketShow.service";
import TicketUpdateService from "../services/tickets/ticketUpdate.service";

export default class TicketsController {
    public static async store(req: Request, res: Response) {
        const { userId } = req;
        let data = { ...req.body };
        if (userId) {
          data = { ...data, userId };
        }
        const tickets = await TicketCreateService.execute(data);
        return res.status(201).json(tickets);

    }
    

    public static async index(req: Request, res: Response) {
        const allTickets = await ticketsListAllService();
        return res.status(200).json(allTickets);
    }

    public static async show(req: Request, res: Response) {
        const {id} = req.params
        const userById = await TicketsShowService.execute(id);
        return res.status(200).json(userById);
    }

    public static async update(req: Request, res: Response) {
      
        const {id} = req.params;
        let data = { ...req.body };
        data = { ...data, id };
        
        const update = await TicketUpdateService.execute(data);
      
        return res.status(200).json({
            message: "Ticket updated",
        });
    }

    public static async delete(req: Request, res: Response) {

        const {id} = req.params;
        await TicketDeleteService.execute(id);
        return res.status(200).json({ message: "User deleted" });
      
    }

}