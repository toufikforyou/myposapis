import express from "express";
import { shopController } from "../controllers/shop.controller";
import { authenticateManager } from "../middlewares/auth.middleware";
import { checkManagerExists } from "../middlewares/manager.middleware";
import { checkShopEmail } from "../middlewares/shop.middleware";
import { handleUploadError, uploadShopLogo } from "../middlewares/upload.middleware";
import { assignManagerValidator } from "../validators/manager.validator";
import { additionalShopValidator, shopRegistrationValidator } from "../validators/shop.validator";

const router = express.Router();

router.post(
    "/",
    uploadShopLogo,
    handleUploadError,
    shopRegistrationValidator,
    checkShopEmail,
    shopController.register
);

router.post(
    "/additional",
    authenticateManager,
    uploadShopLogo,
    handleUploadError,
    additionalShopValidator,
    checkShopEmail,
    shopController.createAdditionalShop
);

router.post(
    "/:shopId/manager",
    authenticateManager,
    assignManagerValidator,
    checkManagerExists,
    shopController.assignManager
);

export default router;