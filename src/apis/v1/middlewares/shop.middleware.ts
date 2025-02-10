import { NextFunction, Request, Response } from "express";
import prisma from "../../../config/prisma";
import ApiResponse from "../../../models/api.response.model";

export const checkShopEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        const { email, phone } = req.body;

        if (!phone && !email) {
            return res
                .status(400)
                .json(new ApiResponse.Error(
                    400,
                    "Email or phone is required",
                    [{
                        field: "email",
                        message: "Email is required"
                    }, {
                        field: "phone",
                        message: "Phone is required"
                    }]

                ));
        }
        // Check for existing shop details

        const existingShop = await prisma.shop.findFirst({
            where: {
                OR: [
                    { email },
                    { phone }
                ]
            }
        });

        if (existingShop) {
            const field = existingShop.email === email ? 'email' : 'phone';
            return res
                .status(400)
                .json(new ApiResponse.Error(
                    400,
                    `Shop ${field} already exists`
                ));
        }

        next();
    } catch (error) {
        console.error('Shop validation error:', error);
        return res
            .status(500)
            .json(new ApiResponse.Error(
                500,
                "Internal server error while validating shop details"
            ));
    }
}; 