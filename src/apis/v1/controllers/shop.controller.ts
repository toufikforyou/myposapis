import { Request, Response } from "express";
import { validationResult } from "express-validator";
import ApiResponse from "../../../models/api.response.model";
import { IAuthenticatedRequest } from "../interfaces/auth.interface";
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

    async createAdditionalShop(req: Request, res: Response) {
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

            const { user } = req as IAuthenticatedRequest;

            // Check if user is SUPERADMIN in any shop
            const isSuperAdmin = await ShopService.checkSuperAdminStatus(user.uid);

            if (!isSuperAdmin) {
                return res
                    .status(403)
                    .json(new ApiResponse.Error(403, "Only SUPERADMIN can create additional shops"));
            }

            const result = await ShopService.createAdditionalShop(req.body, user.uid, req.file?.filename);
            return res.status(201).json(
                new ApiResponse.Success(201, "Additional shop created successfully", result)
            );
        } catch (error) {
            console.error("Shop creation error:", error);
            return res
                .status(500)
                .json(new ApiResponse.Error(500, "Internal server error"));
        }
    }

    async assignManager(req: Request, res: Response) {
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

            const { user } = req as IAuthenticatedRequest;
            const { shopId } = req.params;

            // Check if user is SUPERADMIN for this shop
            const isSuperAdmin = await ShopService.checkShopSuperAdmin(user.uid, shopId);

            if (!isSuperAdmin) {
                return res
                    .status(403)
                    .json(new ApiResponse.Error(403, "Only SUPERADMIN can assign managers"));
            }

            const result = await ShopService.assignManager(shopId, req.body);
            return res.status(201).json(
                new ApiResponse.Success(201, "Manager assigned successfully", result)
            );
        } catch (error) {
            console.error("Manager assignment error:", error);
            return res
                .status(500)
                .json(new ApiResponse.Error(500, "Internal server error"));
        }
    }
}

export const shopController = new ShopController();