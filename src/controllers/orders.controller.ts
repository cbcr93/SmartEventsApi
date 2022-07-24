import { Request, Response } from "express";
import OrderCreateService from "../services/orders/orderCreate.service";
import OrderListAllService from "../services/orders/orderListAll.service";
import OrderUpdateService from "../services/orders/orderUpdate.service";

export default class OrderController {
    public static async store(req: Request, res: Response) {
        const {ticketId} = req.params;
        const { userId } = req;
        let data = req.body
        data = {ticketId, userId, ...data};
        const user = await OrderCreateService.execute(data);
        return res.status(201).json(user);
         
    }

    public static async index(req: Request, res: Response) {
        const { userId } = req;
        const { id } = req.params
        const ticketId = id
        const allTickets = await OrderListAllService.execute(userId, ticketId);
        return res.status(200).json(allTickets);
    }

    public static async show(req: Request, res: Response) {
      
    }

    public static async update(req: Request, res: Response) {
        const {id} = req.params;
        const {isPaid} = req.body ;
        const data = { isPaid, id };
        
        const update = await OrderUpdateService.execute(data);
      
        return res.status(200).json({
            message: "Ticket updated",
        });
    }

    public static async delete(req: Request, res: Response) {
     
    }

}