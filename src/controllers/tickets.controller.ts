import { Request, Response } from "express";
import TicketCreateService from "../services/tickets/ticketCreate.service";

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
      
    }

    public static async show(req: Request, res: Response) {
      
    }

    public static async update(req: Request, res: Response) {
     
    }

    public static async delete(req: Request, res: Response) {
      
    }

}