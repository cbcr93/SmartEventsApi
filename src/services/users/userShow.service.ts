import { instanceToInstance } from "class-transformer";
import { User } from "../../entities/user.entity";

const getUserByIdSvc = async (user: User): Promise<User> => {
  return instanceToInstance(user);
};

export default getUserByIdSvc;