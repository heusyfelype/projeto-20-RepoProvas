import { Request, Response } from "express";
import { getTestsByCategoryService, getTestsByDisciplineService, getTestsByTeacherService } from "../services/getTestsService.js";

export async function getTestsController(req:Request, res:Response) {

    const query = req.query.groupBy as string;
    console.log("query:", query)

    let tests;
    if(query === "disciplines"){ 
        tests = await getTestsByDisciplineService()
    }
    if(query === "teachers"){ 
        tests = await getTestsByTeacherService()
    }

    res.status(200).send(tests);
}

export async function getTestsByCategoryController(req:Request, res:Response) {

    const tests = await getTestsByCategoryService()


    res.status(200).send(tests);
}