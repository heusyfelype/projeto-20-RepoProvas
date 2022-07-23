import { Request, Response } from "express";
import { inputRegisterUserType, registerUserService, signInService, UserType } from "../services/authService.js";

export async function registerUserController(req:Request, res:Response) {

    const infos : inputRegisterUserType = req.body
    await registerUserService({email: infos.email, pass:infos.pass})

    res.sendStatus(201);
}

export async function signInController(req:Request, res:Response) {

    const infos : UserType = req.body
    const tokenAndUserId = await signInService(infos)

    res.locals.token = tokenAndUserId.token
    res.send(tokenAndUserId); 
}