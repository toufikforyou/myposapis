import express from "express";
import { shopController } from "../controllers/shop.controller";
import { checkShopEmail } from "../middlewares/shop.middleware";
import { shopRegistrationValidator } from "../validators/shop.validator";

const router = express.Router();

router.post(
    "/register",
    shopRegistrationValidator,
    checkShopEmail,
    shopController.register
);

export default router;