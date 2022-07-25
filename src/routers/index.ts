import { Router } from "express";
import authRouter from "./authRouter.js";
import devTestRouter from "./devTestRouter.js";
import testsRouter from "./testsRouter.js";


const router = Router();

router.use(authRouter)
router.use(testsRouter)
router.use(devTestRouter)

export default router