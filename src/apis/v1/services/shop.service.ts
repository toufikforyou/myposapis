import prisma from "../../../config/prisma";
import { IShopRegistration } from "../interfaces/shop.interface";

export class ShopService {
    static async registerShop(data: IShopRegistration, filename?: string) {
        const shop = await prisma.shop.create({
            data: {
                ...data,
                logo: filename
            }
        });

        return { shop };
    }
} 