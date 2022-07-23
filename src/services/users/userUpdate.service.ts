import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUpdateUser } from "../../interfaces/users";

export default class UserUpdateService {
  public static async execute(data: IUpdateUser){
    const { name, email, username, id } = data;
  
    const userRepo = AppDataSource.getRepository(User);
    const usersArray = await userRepo.find();
    const user = usersArray.find((user) => user.id === id);

    if(!user){
        throw new Error("User not found")
    }
  
    const newInfo = {
        name,
        email,
        username,
    };
    await userRepo.update(user!.id, newInfo);

    return userRepo
  }
}    