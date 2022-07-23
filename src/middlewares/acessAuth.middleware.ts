import { NextFunction, Request, Response } from "express";
import jwt, { verify } from "jsonwebtoken";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";

const AcessAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new Error("Missing Authorization token")
  }

  const verifyToken = token?.split(" ")[1];
   if(!verifyToken || verifyToken.length <=1){
    throw new Error("Missing Authorization token")
   }
  const secret = String(process.env.JWT_SECRET_KEY)

  const decoded = verify(verifyToken, secret);

  const { sub } = decoded;

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: {
      id: String(sub),
    },
  });

  if (user) {
    return next();
  }
};
export default AcessAuthMiddleware;