import { UploadedFile } from "express-fileupload";
import fs from "fs";
import path from "path";

export class UploadService {
    static async uploadShopLogo(file: UploadedFile, sid: string): Promise<string> {
        try {
            const uploadDir = 'public/shop/logo';

            // Create directory if it doesn't exist
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            // Generate filename with sid and current date
            const filename = `${sid}-${Date.now()}.jpg`;
            const filepath = path.join(uploadDir, filename);

            // Move file to upload directory
            await file.mv(filepath);

            return filename;
        } catch (error) {
            console.error('Logo upload error:', error);
            throw new Error('Failed to upload logo');
        }
    }
} 