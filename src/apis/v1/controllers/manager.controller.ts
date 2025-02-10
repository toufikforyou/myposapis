import { Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../../../config/prisma";
import ApiResponse from "../../../models/api.response.model";
import { IAuthenticatedRequest } from "../interfaces/auth.interface";
import { ManagerService } from "../services/manager.service";

class ManagerController {
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

            const result = await ManagerService.register(req.body);
            return res.status(201).json(
                new ApiResponse.Success(201, "Manager registered successfully", result)
            );
        } catch (error) {
            console.error("Manager registration error:", error);
            return res
                .status(500)
                .json(new ApiResponse.Error(500, "Internal server error"));
        }
    }

    async login(req: Request, res: Response) {
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

            const result = await ManagerService.login(req.body);
            return res.status(200).json(
                new ApiResponse.Success(200, "Manager logged in successfully", result)
            );
        } catch (error) {
            console.error("Manager login error:", error);

            if (error instanceof Error && error.message === "Invalid credentials") {
                return res
                    .status(401)
                    .json(new ApiResponse.Error(401, "Invalid credentials"));
            }

            return res
                .status(500)
                .json(new ApiResponse.Error(500, "Internal server error"));
        }
    }

    async getProfile(req: Request, res: Response) {
        try {
            const { user } = req as IAuthenticatedRequest;
            const manager = await prisma.manager.findUnique({
                where: {
                    uid: user.uid
                },
                select: {
                    uid: true,
                    name: true,
                    email: true,
                    username: true,
                    managedShops: {
                        include: {
                            shop: {
                                select: {
                                    sid: true,
                                    name: true,
                                    email: true
                                }
                            }
                        }
                    },
                    createdAt: true,
                    updatedAt: true,
                }
            });

            if (!manager) {
                return res
                    .status(404)
                    .json(new ApiResponse.Error(404, "Manager not found"));
            }

            return res.status(200).json(
                new ApiResponse.Success(200, "Profile retrieved successfully", {
                    manager
                })
            );
        } catch (error) {
            console.error("Get profile error:", error);
            return res
                .status(500)
                .json(new ApiResponse.Error(500, "Internal server error"));
        }
    }
}

export const managerController = new ManagerController(); 