import { Response, Router } from "express";
import ApiResponse from "../../models/api.response.model";

const router: Router = Router();

router.get("/", (_, res: Response) => {
  res.json(
    new ApiResponse.Success(200, "This is a version 1", {
      page: "Api version 1 home page",
    })
  );
});

router.use(() => {
  throw new ApiResponse.Error(404, "API version 1 route not found!");
});

export default router; 