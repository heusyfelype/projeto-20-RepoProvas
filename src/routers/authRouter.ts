import { Router } from "express";
import { registerUserController, signInController } from "../controllers/authController.js";
import { validSchemaMiddleware } from "../middlewares/validSchema.js";
import { signinSchema, signupSchema } from "../schemas/authSchema.js";


const authRouter = Router();

authRouter.post("/sign-up", validSchemaMiddleware(signupSchema), registerUserController)
authRouter.post("/sign-in", validSchemaMiddleware(signinSchema), signInController)

export default authRouter