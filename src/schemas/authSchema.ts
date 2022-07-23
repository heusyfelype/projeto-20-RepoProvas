import Joi from "joi";

export const signupSchema = Joi.object({
    email: Joi.string().email().required(),
    pass: Joi.string().required(),
    confirmPass: Joi.ref('pass')
})

export const signinSchema = Joi.object({
    email: Joi.string().email().required(),
    pass: Joi.string().required()
})