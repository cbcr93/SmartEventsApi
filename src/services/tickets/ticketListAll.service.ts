import { instanceToInstance } from "class-transformer";
import AppDataSource from "../../data-source";
import { Tickts } from "../../entities/tickts.entity";

const ticketsListAllService = async (): Promise<Tickts[]> => {
    const ticketsRepository = AppDataSource.getRepository(Tickts);
    const allticketss = await ticketsRepository.find();

    return instanceToInstance(allticketss);
};

export default ticketsListAllService;