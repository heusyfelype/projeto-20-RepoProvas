
import { prisma } from "../config/DBconnection.js";
import { UserType } from "../services/authService.js";


export async function selectUserByEmail(email: string) {
    const user = await prisma.users.findFirst({ where: { email } })
    return user
}

export async function createUser(infos: UserType) {
    await prisma.users.create({ data: infos })
}

