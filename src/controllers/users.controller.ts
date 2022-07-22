import { Request, Response } from "express";
import LoginUserService from "../services/users/userLogin.service";
import userCreate from "../services/users/usersCreate.service";
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

    public static async show(req: Request, res: Response) {}

    public static async update(req: Request, res: Response) {}

    public static async delete(req: Request, res: Response) {}

}