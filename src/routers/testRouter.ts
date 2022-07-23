import { Router } from "express";
import { returnInfosTest } from "../middlewares/returnInfosTest.js";


const testRouter = Router();

testRouter.post("/test", returnInfosTest)

export default testRouter