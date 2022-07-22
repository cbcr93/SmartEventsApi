import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

const UserShowService = async (id: string): Promise<User> => {
  const userRepo = AppDataSource.getRepository(User)
    const user = await userRepo.findOneBy({ id })
    if(!user){
      throw new Error("User not found")
    }
    user.password = "*****"
    return user
};

export default UserShowService;