
import { Users } from "@prisma/client";
import { createUser, selectUserByEmail } from "../repositories/authRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { type } from "os";

export type UserType = Omit<Users, "id" >



export async function registerUserService(infos: UserType) {
    const hasUser = await selectUserByEmail(infos.email)
    if (hasUser) {
        throw { type: "conflict", message: "Email já cadastrado" }
    }
    const hashpassword = bcrypt.hashSync(infos.password, 12)
    infos.password = hashpassword
    await createUser(infos)
}

export async function signInService(infos:UserType) {
    const user = await selectUserByEmail(infos.email)
    if(!user){
        throw {type: "unauthorized", message: "Usuário não cadastrado!"}
    }
    if(bcrypt.compareSync(infos.password, user.password)){
        const expireConfig = {expiresIn: 60*60*24}
        const token = jwt.sign({data: {userId:user.id}}, process.env.JWT_SECRET, expireConfig)
        return {token}
    }
    throw {type: "unauthorized", message: "Email ou senha incorretos!"}
}