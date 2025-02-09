import { Request, Response } from "express";
import { validationResult } from "express-validator";
import ApiResponse from "../../../models/api.response.model";
import { ShopService } from "../services/shop.service";

class ShopController {
    async register(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            const formattedErrors = errors.array().map(error => ({
                field: error.type === "field" ? error.path : "unknown",
                message: error.msg
            }));

            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json(new ApiResponse.Error(400, "Validation error", formattedErrors));
            }

            const result = await ShopService.registerShop(req.body, req.file?.filename);
            return res.status(201).json(
                new ApiResponse.Success(201, "Shop registered successfully", result)
            );
        } catch (error) {
            console.error("Shop registration error:", error);
            return res
                .status(500)
                .json(new ApiResponse.Error(500, "Internal server error"));
        }
    }
}

export const shopController = new ShopController();