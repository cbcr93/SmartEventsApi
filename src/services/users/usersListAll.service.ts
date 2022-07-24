import { instanceToInstance } from "class-transformer";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IReturnUser } from "../../interfaces/users";


export default class  UserListAllService {
    public static async execute(){

        const userRepository = AppDataSource.getRepository(User);
        const allUsers = await userRepository.find();

        const userList = allUsers.map((user) => {

            const returnedorder: IReturnUser = {
                id: user.id as string,
                name: user.name as string,
                username: user.username as string,
                email: user.email as string,
                isSeller: user.isSeller as boolean,
            };
    
            return returnedorder;
        });
        

        return userList;
    }
};