import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { addLog } from "./logs.controller.js";

const router = Router();

router.post("/", asyncHandler(addLog));

export default router;
