import { instanceToInstance } from "class-transformer";
import AppDataSource from "../../data-source";
import { Order } from "../../entities/orders.entity";
import { Tickts } from "../../entities/tickts.entity";

export default class  OrderListAllService {
    public static async execute(){

    const orderRepository = AppDataSource.getRepository(Order);
    const allorders = await orderRepository.find();

    return instanceToInstance(allorders);
    };
}
