import Joi from "joi";
import { UserType } from "../services/authService";

export const signupANDSigninSchema = Joi.object<UserType>({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

