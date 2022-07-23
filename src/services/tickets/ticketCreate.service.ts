import AppDataSource from "../../data-source";
import { instanceToInstance } from "class-transformer";
import { Tickts } from "../../entities/tickts.entity";
import { ICreateTicket } from "../../interfaces/tickts";
import { User } from "../../entities/user.entity";

export default class TicketCreateService {
    public static async execute(data: ICreateTicket){
    const { title, price, description, amounts, category, userId } = data
    const ticketRepository = AppDataSource.getRepository(Tickts);
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
        where: {
          id: data.userId,
        },
      });

    const newTicket = ticketRepository.create({
        title,
        price,
        description,
        amounts,
        category,
        user: user as User,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    await ticketRepository.save(newTicket);

    return instanceToInstance(newTicket);
    };
}

