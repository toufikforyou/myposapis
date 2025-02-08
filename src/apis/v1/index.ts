import { Router } from "express";
import ApiResponse from "../../models/api.response.model";
import v1Routes from "./routes";

const router: Router = Router();

router.use("/", v1Routes);

router.use(() => {
  throw new ApiResponse.Error(404, "API version 1 route not found!");
});

export default router; 