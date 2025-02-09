import { NextFunction, Request, Response } from "express";
import fs from "fs";
import multer from "multer";
import ApiResponse from "../../../models/api.response.model";

const uploadDir = 'public/shop/logo';

// Create upload directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now();
        const ext = file.mimetype.split('/')[1];  // Get file extension from mimetype
        cb(null, `shop-${uniqueSuffix}.${ext}`);
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Only JPG, JPEG, or PNG format allowed'));
    }
    cb(null, true);
};

export const uploadShopLogo = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024 // 2MB
    },
    fileFilter: fileFilter
}).single('logo');

export const handleUploadError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof multer.MulterError || err) {
        return res.status(400).json(
            new ApiResponse.Error(400, "Logo upload error", [{
                field: "logo",
                message: err.message
            }])
        );
    }
    next();
}; 