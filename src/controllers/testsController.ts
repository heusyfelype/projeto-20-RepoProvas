import { Request, Response } from "express";
import { getTestsByCategoryService, getTestsByDisciplineService } from "../services/getTestsService.js";

export async function getTestsController(req:Request, res:Response) {

    const query = req.query.groupBy as string;
    console.log("query:", query)

    const tests = await getTestsByDisciplineService()

    res.status(200).send(tests);
}

export async function getTestsByCategoryController(req:Request, res:Response) {

    const tests = await getTestsByCategoryService()


    res.status(200).send(tests);
}