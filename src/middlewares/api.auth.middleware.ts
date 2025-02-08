import { NextFunction, Request, Response } from 'express';
import ApiResponse from '../models/api.response.model';

export default (req: Request, res: Response, next: NextFunction): void => {
  const apiKey: string = req.headers['x-api-key'] as string || req.query.api_key as string || 'your-api-key';
  const serverIp: string = (req.headers['cf-connecting-ip'] as string) || req.ip || '127.0.0.1';
  const hostname: string = req.hostname;

  console.log(serverIp, hostname);

  if (apiKey !== process.env.API_KEY) {
    res.status(401).json(
      new ApiResponse.Error(401, "Unauthorized", {
        message: "Invalid API Key",
      })
    );
    return;
  }

  next();
}; 