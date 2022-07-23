
import { Users } from "@prisma/client";
import { createUser, selectUserByEmail } from "../repositories/authRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { type } from "os";

export type UserType = Omit<Users, "id" >
export type inputRegisterUserType ={
    email: string;
    pass: string;
    confirmPass: string;
}


export async function registerUserService(infos: UserType) {
    const hasUser = await selectUserByEmail(infos.email)
    if (hasUser) {
        throw { type: "conflict", message: "Email já cadastrado" }
    }
    const hashPass = bcrypt.hashSync(infos.pass, 12)
    infos.pass = hashPass
    await createUser(infos)
}

export async function signInService(infos:UserType) {
    const user = await selectUserByEmail(infos.email)
    if(!user){
        throw {type: "unauthorized", message: "Usuário não cadastrado!"}
    }
    if(bcrypt.compareSync(infos.pass, user.pass)){
        const expireConfig = {expiresIn: 60*60*24}
        const token = jwt.sign({data: {userId:user.id}}, process.env.JWT_SECRET, expireConfig)
        return {token}
    }
    throw {type: "unauthorized", message: "Email ou senha incorretos!"}
}