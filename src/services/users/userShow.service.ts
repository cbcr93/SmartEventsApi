import AppError from "../../../errors/appError";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

export default class  UserShowService {
    public static async execute(id : string){
        const userRepo = AppDataSource.getRepository(User)
        const user = await userRepo.findOneBy({ id })
        if(!user){
            throw new AppError("User not found", 404)
        }
        user.password = "*****"
        return user
    };
}
