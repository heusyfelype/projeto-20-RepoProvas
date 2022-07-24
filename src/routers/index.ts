import { Router } from "express";
import authRouter from "./authRouter.js";
import getInfosRouter from "./getinfosRouter.js";
import testRouter from "./testRouter.js";


const router = Router();

router.use(authRouter)
router.use(getInfosRouter)
router.use(testRouter)

export default router