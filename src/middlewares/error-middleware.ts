import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/exceptions/http-exeption';

function erroMiddleware(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { status = 500, message = 'Something wen wrong' } = error;
  res.status(status).json({
    status,
    message,
  });
  next();
}
export default erroMiddleware;
