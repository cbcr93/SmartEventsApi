import { Request, Response } from "express";
import UserDeleteService from "../services/users/userDelete.service";
import LoginUserService from "../services/users/userLogin.service";
import UpdateUserService from "../services/users/userUpdate.service";
import userCreate from "../services/users/usersCreate.service";
import UserShowService from "../services/users/userShow.service";
import userListAllService from "../services/users/usersListAll.service";
import UserListAllService from "../services/users/usersListAll.service";

export default class UserController {
    public static async store(req: Request, res: Response) {
        
        const data = req.body;
        const user = await userCreate(data);
        return res.status(201).json(user);
         
    }
    
    public static async login(req: Request, res: Response) {
      
        const data = req.body;
        const login = await LoginUserService.execute(data);
        return res.status(201).json(login);
      
    }

    public static async index(req: Request, res: Response) {
      
        const allUsers = await UserListAllService.execute();
        return res.status(200).json(allUsers);
      
    }

    public static async show(req: Request, res: Response) {
      
        const {id} = req.params
        const userById = await UserShowService.execute(id);
        return res.status(200).json(userById);
      
    }

    public static async update(req: Request, res: Response) {
      
        const {id} = req.params;
        const data = req.body;
        data.id = id
        const update = await UpdateUserService.execute(data);
      
        return res.status(200).json({
            message: "User updated",
        });

    }

    public static async delete(req: Request, res: Response) {
      
        const {id} = req.params;
        await UserDeleteService.execute(id);
        return res.status(200).json({ message: "User deleted" });
      
    }

}