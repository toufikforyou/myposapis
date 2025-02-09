import bcrypt from "bcrypt";
import prisma from "../../../config/prisma";
import { IShopRegistration } from "../interfaces/shop.interface";

export class ShopService {
    static async registerShop(data: IShopRegistration) {
        const { manager, ...shopData } = data;

        // Create transaction to ensure both operations succeed or fail together
        return await prisma.$transaction(async (prisma) => {
            // Create manager
            const hashedPassword = await bcrypt.hash(manager.password, 10);
            const newManager = await prisma.manager.create({
                data: {
                    ...manager,
                    password: hashedPassword,
                },
            });

            // Create shop and link it with manager
            const newShop = await prisma.shop.create({
                data: {
                    ...shopData,
                    managers: {
                        create: {
                            managerId: newManager.uid,
                            role: "SUPERADMIN",
                        },
                    },
                },
                include: {
                    managers: {
                        include: {
                            manager: true,
                        },
                    },
                },
            });

            return { shop: newShop };
        });
    }
} 