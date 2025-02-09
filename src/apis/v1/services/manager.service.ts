import bcrypt from "bcrypt";
import prisma from "../../../config/prisma";
import { IManagerRegistration } from "../interfaces/manager.interface";

export class ManagerService {
    static async register(data: IManagerRegistration) {
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

            // Link manager to shop as SUPERADMIN
            await prisma.shopManager.create({
                data: {
                    managerId: newManager.uid,
                    shopId: data.sid,
                    role: "SUPERADMIN",
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