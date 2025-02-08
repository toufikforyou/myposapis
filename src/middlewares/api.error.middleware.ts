import { NextFunction, Request, Response } from 'express';
import ApiResponse from '../models/api.response.model';

interface CustomError extends Error {
  status_code?: number;
  errors?: any | null;
}

const errorHandler = (err: CustomError, _: Request, res: Response, next: NextFunction): Response => {
  return res
    .status(err.status_code || 500)
    .json(
      new ApiResponse.Error(err.status_code || 500, err.message, err.errors)
    );
};


export { errorHandler };

