import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../../config/prisma";
import { IManagerLogin, IManagerRegistration } from "../interfaces/manager.interface";

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

    static async login(data: IManagerLogin) {
        const manager = await prisma.manager.findFirst({
            where: {
                OR: [
                    { email: data.username },
                    { username: data.username }
                ]
            }
        });

        if (!manager) {
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(data.password, manager.password);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        const shopManagers = await prisma.shopManager.findMany({
            where: {
                managerId: manager.uid
            },
            include: {
                shop: {
                    select: {
                        sid: true
                    }
                }
            }
        });

        const token = jwt.sign(
            {
                uid: manager.uid,
                email: manager.email,
                username: manager.username,
                sid: shopManagers.map(sm => sm.shop.sid)
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '15d' }
        );

        const existingSession = await prisma.session.findFirst({
            where: {
                uid: manager.uid
            }
        });

        if (existingSession) {
            await prisma.session.update({
                where: {
                    id: existingSession.id
                },
                data: {
                    token
                }
            });
        } else {
            await prisma.session.create({
                data: {
                    uid: manager.uid,
                    token
                }
            });
        }

        return {
            token,
            email: manager.email,
            username: manager.username,
            shops: shopManagers.map(sm => sm.shop.sid),
            expiresIn: new Date(Date.now() + (15 * 24 * 60 * 60 * 1000)).toISOString()
        };
    }
} 