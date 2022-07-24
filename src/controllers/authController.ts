import { Request, Response } from "express";
import { registerUserService, signInService, UserType } from "../services/authService.js";

export async function registerUserController(req:Request, res:Response) {

    const infos : UserType = req.body
    await registerUserService(infos)

    res.sendStatus(201);
}

export async function signInController(req:Request, res:Response) {

    const infos : UserType = req.body
    const tokenAndUserId = await signInService(infos)

    res.locals.token = tokenAndUserId.token
    res.send(tokenAndUserId); 
}