import express from "express";
import { managerController } from "../controllers/manager.controller";
import { checkManagerExists } from "../middlewares/manager.middleware";
import { managerRegistrationValidator } from "../validators/manager.validator";

const router = express.Router();

router.post(
    "/",
    managerRegistrationValidator,
    checkManagerExists,
    managerController.register
);

export default router; 