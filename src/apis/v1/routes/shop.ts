import express from "express";
import { shopController } from "../controllers/shop.controller";
import { checkShopEmail } from "../middlewares/shop.middleware";
import { handleUploadError, uploadShopLogo } from "../middlewares/upload.middleware";
import { shopRegistrationValidator } from "../validators/shop.validator";

const router = express.Router();

router.post(
    "/",
    uploadShopLogo,
    handleUploadError,
    shopRegistrationValidator,
    checkShopEmail,
    shopController.register
);

export default router;