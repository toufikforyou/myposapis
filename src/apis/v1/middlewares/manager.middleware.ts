import { NextFunction, Request, Response } from "express";
import prisma from "../../../config/prisma";
import ApiResponse from "../../../models/api.response.model";

export const checkManagerExists = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, username, sid } = req.body;

        // Check for existing manager email or username
        const existingManager = await prisma.manager.findFirst({
            where: {
                OR: [
                    { email },
                    { username }
                ]
            }
        });

        if (existingManager) {
            const field = existingManager.email === email ? 'email' : 'username';
            return res
                .status(400)
                .json(new ApiResponse.Error(
                    400,
                    `Manager ${field} already exists`,
                    [{
                        field: field,
                        message: `Manager ${field} already exists`
                    }]
                ));
        }


        // Check if shop exists
        const shop = await prisma.shop.findFirst({
            where: {
                sid: sid
            }
        });

        if (!shop) {
            return res
                .status(404)
                .json(new ApiResponse.Error(
                    404,
                    "Shop not found",
                    [{
                        field: "sid",
                        message: "Shop not found"
                    }]
                ));
        }


        next();
    } catch (error) {
        console.error('Manager validation error:', error);
        return res
            .status(500)
            .json(new ApiResponse.Error(500, "Internal server error"));
    }
}; 