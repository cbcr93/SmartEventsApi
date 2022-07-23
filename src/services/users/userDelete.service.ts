import { DeleteResult } from "typeorm";
import AppError from "../../errors/appError";
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
            throw new AppError("User not found", 401);
        }
        return userRepo.delete(id);
    }
}