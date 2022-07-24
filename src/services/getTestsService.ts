import { Express } from "express";
import { getTestsByCategory, getTestsByDiscipline } from "../repositories/getTests.js";


export async function getTestsByDisciplineService() {

    const tests = await getTestsByDiscipline()

    return tests
}


export async function getTestsByCategoryService() {

    const tests = await getTestsByCategory()

    return tests
}


