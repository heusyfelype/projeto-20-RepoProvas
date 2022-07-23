import { Express, Request, Response } from "express";

export function returnInfosTest(req:Request, res:Response){
    return res.send(req.body)
}