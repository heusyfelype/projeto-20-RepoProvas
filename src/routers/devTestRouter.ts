import { Router } from "express";
import { returnInfosTest } from "../middlewares/returnInfosTest.js";


const devTestRouter = Router();

devTestRouter.post("/test", returnInfosTest)

export default devTestRouter