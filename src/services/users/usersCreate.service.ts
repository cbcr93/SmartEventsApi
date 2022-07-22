import AppDataSource from "../../data-source";
import bcrypt from "bcryptjs";
import { User } from "../../entities/user.entiny";
import { ICreateUser } from "../../interfaces/users";
import { instanceToInstance } from "class-transformer";

const userCreate = async (data: ICreateUser): Promise<User> => {
  const {name, email, username, isSeller, password} = data
  const userRepository = AppDataSource.getRepository(User);
  const usersArray = await userRepository.find();

  const emailAlreadyExists = usersArray.find((user) => user.email === email);
  const usernameAlreadyExists = usersArray.find((user) => user.username === username);

  if (emailAlreadyExists) {
    throw new Error("Email already exists.");
  }
  if (usernameAlreadyExists) {
    throw new Error("Username already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 8);

  const newUser = userRepository.create({
    name,
    email,
    username,
    isSeller,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await userRepository.save(newUser);

  return instanceToInstance(newUser);
};

export default userCreate;