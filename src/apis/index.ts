import { Response, Router } from "express";
import apiAuthMiddleware from "../middlewares/api.auth.middleware";
import v1Routes from "./v1/index";

const apiRouter: Router = Router();

apiRouter.use("/v1", apiAuthMiddleware, v1Routes);

apiRouter.use((_, res: Response) => {
  res.redirect("/404");
});

export default apiRouter; 