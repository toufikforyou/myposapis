import { Response, Router } from "express";
import ApiResponse from "../../../models/api.response.model";


const router: Router = Router();

router.get("/", (_, res: Response) => {
    res.json(
        new ApiResponse.Success(200, "This is a version 1", {
            page: "Api version 1 home page",
        })
    );
});


export default router; 