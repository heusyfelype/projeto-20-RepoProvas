import Joi from "joi";
import { testType } from "../services/getTestsService";


export const testsSchema = Joi.object<testType>({
    name: Joi.string().required(),
    category: Joi.string().required(),
    pdfUrl: Joi.string().uri().required(),
    teacherDiscipline: Joi.string().required(),
    discipline:Joi.string().required()
})