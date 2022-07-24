import { Router } from "express";
import { getTestsByCategoryController, getTestsController } from "../controllers/testsController.js";

const getInfosRouter = Router();

getInfosRouter.get("/tests", getTestsController)
getInfosRouter.get("/categories", getTestsByCategoryController)

export default getInfosRouter;




