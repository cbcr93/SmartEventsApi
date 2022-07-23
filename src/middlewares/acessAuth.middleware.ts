import { NextFunction, Request, Response } from "express";
import jwt, { verify } from "jsonwebtoken";
import AppError from "../errors/appError";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";

const AcessAuthMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError("Missing Authorization token", 401)
    }

    const verifyToken = token?.split(" ")[1];
    if(!verifyToken || verifyToken.length <=1){
      throw new AppError("Missing Authorization token", 401)
    }
    const secret = String(process.env.JWT_SECRET_KEY)

    const decoded = jwt.verify(verifyToken, secret);

    const { sub } = decoded;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: {
        id: String(sub),
      },
    });

    req.userId = sub as string;

    if (user) {
      return next();
    }
};
export default AcessAuthMiddleware;