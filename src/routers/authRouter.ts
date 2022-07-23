import { Router } from "express";
import { registerUserController, signInController } from "../controllers/authController.js";
import { validSchemaMiddleware } from "../middlewares/validSchema.js";
import { signinSchema, signupSchema } from "../schemas/authSchema.js";


const authRouter = Router();

authRouter.post("/signup", validSchemaMiddleware(signupSchema), registerUserController)
authRouter.post("/signin", validSchemaMiddleware(signinSchema), signInController)

export default authRouter