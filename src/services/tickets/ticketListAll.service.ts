import { instanceToInstance } from "class-transformer";
import AppDataSource from "../../data-source";
import { Tickts } from "../../entities/tickts.entity";

export default class  TicketsListAllService {
    public static async execute(){

        const ticketsRepository = AppDataSource.getRepository(Tickts);
        const allticketss = await ticketsRepository.find();


        const ticktList = allticketss.map((tickt) => {

            const returnedorder = {
                id: tickt.id as string,
                title: tickt.title as string,
                category: tickt.category as string,
                description: tickt.description as string,
                price: tickt.price as number,
                createdAt: tickt.createdAt as Date,
                updatedAt: tickt.updatedAt as Date,
            };
    
            return returnedorder;
        });
        
        return ticktList;
    }
}
