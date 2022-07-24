import { instanceToInstance } from "class-transformer";
import AppDataSource from "../../data-source";
import { Tickts } from "../../entities/tickts.entity";

export default class  TicketsListAllService {
    public static async execute(){

        const ticketsRepository = AppDataSource.getRepository(Tickts);
        const allticketss = await ticketsRepository.find();

        return instanceToInstance(allticketss);
    };
}
