import express, { Express, Request, Response } from 'express';
import path from 'path';
import apiRouter from './apis';
import { errorHandler } from './middlewares/api.error.middleware';
import ApiResponse from './models/api.response.model';
import setHeader from './utils/header.utils';

const app: Express = express();

app.use("/robots.txt", (req: Request, res: Response) => {
  res.sendFile(path.resolve(process.cwd(), "robots.txt"));
});

app.get("/", (req: Request, res: Response) => {
  return res.json(
    new ApiResponse.Success(200, "Welcome to the API", {
      message: "This is the home page of the API",
    })
  );
});

app.use(setHeader);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.use((_: Request, res: Response) => {
  return res.status(404).json(
    new ApiResponse.Error(404, "Not Found", {
      message: "The requested resource was not found",
    })
  );
});

// Api Error Middleware
app.use(errorHandler);

export default app; 