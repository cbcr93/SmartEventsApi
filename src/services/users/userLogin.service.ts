import AppDataSource from "../../data-source";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../entities/user.entity";
import { ILoginUser } from "../../interfaces/users";
import AppError from "../../errors/appError";

export default class LoginUserService {
    public static async execute(data: ILoginUser) {
        const { password, login } = data;
  
        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.find();
        const findUseremail = user.find((user) => user.email === login);
        const findUsername = user.find((user) => user.username === login);
        let findUser;
        if(findUseremail){
            findUser = findUseremail
        }
        else if(findUsername){
            findUser = findUsername
        }
        else{
            throw new AppError("Email or password invalid", 401);
        }

        
        const comparePasswordHash = await bcryptjs.compare(
            password,
            findUser.password
        );
    
        if (!comparePasswordHash) {
            throw new AppError("Email or password invalid", 401);
        }
    
        const generateToken = jwt.sign(
            { 
                username: findUser.username
            },
            String(process.env.JWT_SECRET_KEY),
            {
                expiresIn: "24h",
                subject: findUser.id,
            }
        );
    
        return { accessToken: generateToken };
    }
}