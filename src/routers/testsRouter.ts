import { Router } from "express";
import { getTestsByCategoryController, getTestsController, postTestController } from "../controllers/testsController.js";
import { validSchemaMiddleware } from "../middlewares/validSchema.js";
import { validToken } from "../middlewares/validToken.js";
import { testsSchema } from "../schemas/testsSchema.js";

const testsRouter = Router();

testsRouter.get("/tests", validToken, getTestsController)
testsRouter.get("/categories", validToken, getTestsByCategoryController)
testsRouter.post("/tests", validToken, validSchemaMiddleware(testsSchema), postTestController)

export default testsRouter;




