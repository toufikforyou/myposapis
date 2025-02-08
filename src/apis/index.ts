import { Router } from "express";
import apiAuthMiddleware from "../middlewares/api.auth.middleware";
import v1Routes from "./v1";

const apiRouter: Router = Router();

apiRouter.use("/v1", apiAuthMiddleware, v1Routes);

export default apiRouter; 