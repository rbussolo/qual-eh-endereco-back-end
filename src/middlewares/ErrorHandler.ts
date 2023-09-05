import { NextFunction, Request, Response } from "express";

import { AppError } from "../errors/AppError";

class ServerError {
  status!: number;
  message!: string;
  code?: string;
  messages?: string[];
  additionalInfo?: any;

  constructor(message: string, status: number = 500, code: string = "", messages: string[] = [], additionalInfo: any = {}) {
    this.status = status;
    this.message = message;
    this.code = code;
    this.messages = messages;
    this.additionalInfo = additionalInfo;
  }
}

function handleError(
  err: TypeError | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let serverError: ServerError;

  if (err instanceof AppError) {
    serverError = new ServerError(err.message, err.statusCode, err.code);
  } else {
    serverError = new ServerError('Ocorreu um erro interno no servidor!', 500, err.name, [err.message], err.stack);
  }

  res.status(serverError.status).send(serverError);
};

export default handleError;