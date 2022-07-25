import { Router } from "express";
import { registerUserController, signInController } from "../controllers/authController.js";
import { validSchemaMiddleware } from "../middlewares/validSchema.js";
import { signupANDSigninSchema } from "../schemas/authSchema.js";


const authRouter = Router();

authRouter.post("/sign-up", validSchemaMiddleware(signupANDSigninSchema), registerUserController)
authRouter.post("/sign-in", validSchemaMiddleware(signupANDSigninSchema), signInController)

export default authRouter