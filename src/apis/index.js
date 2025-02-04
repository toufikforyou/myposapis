import { Router } from "express";
const apiRouter = Router();

import apiAuthMiddleware from "../middlewares/api.auth.middleware.js";
import v1Routes from "./v1/index.js";

apiRouter.use("/v1", apiAuthMiddleware, v1Routes);

apiRouter.use((_, res) => {
  res.redirect("/404");
});

export default apiRouter;
