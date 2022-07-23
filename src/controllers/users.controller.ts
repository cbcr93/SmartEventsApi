import { Request, Response } from "express";
import UserDeleteService from "../services/users/userDelete.service";
import LoginUserService from "../services/users/userLogin.service";
import UpdateUserService from "../services/users/userPatch.service";
import userCreate from "../services/users/usersCreate.service";
import UserShowService from "../services/users/userShow.service";
import userListAllService from "../services/users/usersListAll.service";

export default class UserController {
    public static async store(req: Request, res: Response) {
        try {
          console.log(req.body)
            const data = req.body;
            const user = await userCreate(data);
            return res.status(201).json(user);
          } catch (err) {
            if (err instanceof Error) {
              return res.status(400).json({
                error: err.name,
                message: err.message,
              });
            }
          }
    }
    
    public static async login(req: Request, res: Response) {
      try{
        const data = req.body;
        const login = await LoginUserService.execute(data);
        return res.status(201).json(login);
      } catch (err) {
        if (err instanceof Error) {
          return res.status(400).json({
            error: err.name,
            message: err.message,
          });
        }
      }
    }

    public static async index(req: Request, res: Response) {
      try {
        const allUsers = await userListAllService();
        return res.status(200).json(allUsers);
      } catch (err) {
        if (err instanceof Error) {
          return res.status(400).json({
            error: err.name,
            message: err.message,
          });
        }
      }
    }

    public static async show(req: Request, res: Response) {
      try {
        const {id} = req.params
        const userById = await UserShowService.execute(id);
        return res.status(200).json(userById);
      } catch (err) {
        if (err instanceof Error) {
          return res.status(400).json({
            error: err.name,
            message: err.message,
          });
        }
      }
    }

    public static async update(req: Request, res: Response) {
      try {
        const {id} = req.params;
        const data = req.body;
        data.id = id
        const update = await UpdateUserService.execute(data);
    
        return res.status(200).json({
          message: "User updated",
        });
      } catch (err) {
        if (err instanceof Error) {
          return res.status(400).json({
            error: err.name,
            message: err.message,
          });
        }
      }

    }

    public static async delete(req: Request, res: Response) {
      try {
        const {id} = req.params;
        await UserDeleteService.execute(id);
    
        return res.status(200).json({ message: "User deleted" });
      } catch (err) {
        if (err instanceof Error) {
          return res.status(400).json({
            error: err.name,
            message: err.message,
          });
        }
      }
    }

}