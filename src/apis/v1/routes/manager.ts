import express from "express";
import { managerController } from "../controllers/manager.controller";
import { authenticateManager } from "../middlewares/auth.middleware";
import { checkManagerExists } from "../middlewares/manager.middleware";
import { managerLoginValidator, managerRegistrationValidator } from "../validators/manager.validator";

const router = express.Router();

// Public routes
router.post(
    "/",
    managerRegistrationValidator,
    checkManagerExists,
    managerController.register
);

router.post(
    "/login",
    managerLoginValidator,
    managerController.login
);

// Protected routes (example)
router.get(
    "/profile",
    authenticateManager,
    managerController.getProfile
);

export default router; 