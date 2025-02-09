import prisma from "../../../config/prisma";
import { IShopRegistration } from "../interfaces/shop.interface";

export class ShopService {
    static async registerShop(data: IShopRegistration) {
        const shop = await prisma.shop.create({
            data: {
                ...data
            }
        });

        return { shop };
    }
} 