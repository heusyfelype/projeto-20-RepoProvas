import { NextFunction, Request, Response } from "express";

export function handleError(error, req:Request, res:Response, next:NextFunction){
    console.log("Erro: ", error)

    if(error.type){
        return typeErrorHandle(error.tye, error.message, error, res)
    }

    return res.sendStatus(500);
}

//melhorar a função handle error@

function typeErrorHandle(type:string, message:string, error, res:Response){
    if(type === "unprocessable entity"){
        res.status(422).send(message)
    }
    if(type === "conflict"){
        res.status(409).send(message)
    }
    if(type === "unauthorized"){
        res.status(401).send(message)
    }
    if(type === "not found"){
        res.status(404).send(message)
    }

    res.status(500).send(error)
}