import { Request, Response } from "express";
import OrderCreateService from "../services/orders/orderCreate.service";

export default class OrderController {
    public static async store(req: Request, res: Response) {
        const {ticketId} = req.params;
        const { buyerId } = req;
        const data = {ticketId, buyerId};
        const user = await OrderCreateService.execute(data);
     
        return res.status(201).json(user);
         
    }
    
    public static async login(req: Request, res: Response) {
      
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