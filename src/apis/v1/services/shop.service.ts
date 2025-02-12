import bcrypt from "bcrypt";
import prisma from "../../../config/prisma";
import { IAdditionalShopCreate, IAssignManager, IShopRegistration } from "../interfaces/shop.interface";

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

    static async checkSuperAdminStatus(uid: string): Promise<boolean> {
        const superAdminShop = await prisma.shopManager.findFirst({
            where: {
                managerId: uid,
                role: "SUPERADMIN"
            }
        });
        return !!superAdminShop;
    }

    static async checkShopSuperAdmin(uid: string, shopId: string): Promise<boolean> {
        const superAdminShop = await prisma.shopManager.findFirst({
            where: {
                managerId: uid,
                shopId: shopId,
                role: "SUPERADMIN"
            }
        });
        return !!superAdminShop;
    }

    static async createAdditionalShop(data: IAdditionalShopCreate, managerId: string, logo?: string) {
        return await prisma.$transaction(async (prisma) => {
            const newShop = await prisma.shop.create({
                data: {
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    address: data.address,
                    country: data.country,
                    website: data.website,
                    logo: logo || "",
                    bin: data.bin,
                    description: data.description,
                    industry: data.industry,
                    type: data.type,
                    employeeRange: data.employeeRange,
                }
            });

            // Link creator as SUPERADMIN
            await prisma.shopManager.create({
                data: {
                    managerId: managerId,
                    shopId: newShop.sid,
                    role: "SUPERADMIN",
                }
            });

            return { shop: newShop };
        });
    }

    static async assignManager(shopId: string, data: IAssignManager) {
        return await prisma.$transaction(async (prisma) => {
            const hashedPassword = await bcrypt.hash(data.password, 10);

            const newManager = await prisma.manager.create({
                data: {
                    name: data.name,
                    username: data.username,
                    email: data.email,
                    password: hashedPassword,
                }
            });

            await prisma.shopManager.create({
                data: {
                    managerId: newManager.uid,
                    shopId: shopId,
                    role: "ADMIN",
                }
            });

            return {
                manager: {
                    ...newManager,
                    password: undefined
                }
            };
        });
    }
} 