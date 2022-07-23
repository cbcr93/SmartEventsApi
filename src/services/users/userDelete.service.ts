import { DeleteResult } from "typeorm";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

export default class UserDeleteService {
    public static async execute(id: string): Promise<DeleteResult> {
        const userRepo = AppDataSource.getRepository(User);

        const userDelete = await userRepo.findOne({
            where: {
            id,
            },
        });
    
        if (!userDelete) {
            throw new Error("Property not found");
        }
        return userRepo.delete(id);
    }
}