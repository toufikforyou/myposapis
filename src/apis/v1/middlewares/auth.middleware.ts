import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../../config/prisma";
import ApiResponse from "../../../models/api.response.model";
import { IAuthenticatedRequest, JWTPayload } from "../interfaces/auth.interface";

declare global {
    namespace Express {
        interface Request {
            user?: JWTPayload;
            token?: string;
        }
    }
}

export const authenticateManager = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            return res
                .status(401)
                .json(new ApiResponse.Error(401, "No token provided"));
        }

        const token = authHeader.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || 'your-secret-key'
        ) as JWTPayload;

        // Check if session exists and is valid
        const session = await prisma.session.findFirst({
            where: {
                uid: decoded.uid,
                token: token
            }
        });

        if (!session) {
            return res
                .status(401)
                .json(new ApiResponse.Error(401, "Invalid or expired session"));
        }

        // Check if manager still exists
        const manager = await prisma.manager.findUnique({
            where: {
                uid: decoded.uid
            }
        });

        if (!manager) {
            return res
                .status(401)
                .json(new ApiResponse.Error(401, "Manager not found"));
        }

        // Attach user info to request
        (req as IAuthenticatedRequest).user = decoded;
        (req as IAuthenticatedRequest).token = token;

        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res
                .status(401)
                .json(new ApiResponse.Error(401, "Invalid token"));
        }
        if (error instanceof jwt.TokenExpiredError) {
            return res
                .status(401)
                .json(new ApiResponse.Error(401, "Token expired"));
        }

        console.error("Authentication error:", error);
        return res
            .status(500)
            .json(new ApiResponse.Error(500, "Internal server error"));
    }
}; 