import { NextFunction, Request, Response } from "express";
import jwt, { verify } from "jsonwebtoken";
import AppError from "../../errors/appError";
import AppDataSource from "../data-source";
import { Tickts } from "../entities/tickts.entity";
import { User } from "../entities/user.entity";

const AcessOwnerTicketsMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {id} = req.params;
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

    const seller = user?.isSeller

    const ticketRepo = AppDataSource.getRepository(Tickts);
    const ticket = user?.tickts.find((ticket) => ticket.id === id)


    if(!seller){
        throw new AppError("Missing Authorization token - seller", 401)
    }

    if(!ticket){
        throw new AppError("Missing Authorization token - ticket", 401)
    }


    
    return next();
    
};
export default AcessOwnerTicketsMiddleware;