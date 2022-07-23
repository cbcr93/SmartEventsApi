import { Request, Response, NextFunction } from "express";
import AppError from "../../errors/appError";


const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      statusCode: err.statusCode,
      message: err.message,
    });
  }

  console.log(err);

  return res.status(500).json({ message: "Internal server error!" });
};

export default errorHandlerMiddleware;
