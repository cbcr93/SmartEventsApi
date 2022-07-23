import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUpdateUser } from "../../interfaces/users";
import bcrypt from "bcryptjs";

export default class UserUpdateService {
  public static async execute(data: IUpdateUser){
    const { name, email, password, username, id } = data;
  
    const userRepo = AppDataSource.getRepository(User);
  
    const user = await userRepo.findOneBy({ id })

    if(!user){
        throw new Error("User not found")
    }

    let hashedPassword;

    if(password){
         hashedPassword = await bcrypt.hash(password, 8);
    }
  
    const newInfo = {
        name,
        email,
        password: password ? hashedPassword : password,
        username,
    };
    await userRepo.update(user!.id, newInfo);

    return userRepo
  }
}    