import { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";

export function validSchemaMiddleware(schema: ObjectSchema) {
    function validSchema(req: Request, res: Response, next: NextFunction) {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            throw { type: "unauthorized", message: error.details.map(detail => detail.message) }
        }
        next();
    };

    return validSchema
}