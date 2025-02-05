import { NextFunction, Request, Response } from 'express';

const allowedOrigins: string[] = ["http://localhost:3000"];

export default (req: Request, res: Response, next: NextFunction): void => {
  const origin = req.headers.origin;

  res.setHeader("Access-Control-Allow-Origin", allowedOrigins);
  res.setHeader("x-powered-by", "My Epos Server");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "600");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("X-Robots-Tag", "noindex, nofollow");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  next();
}; 