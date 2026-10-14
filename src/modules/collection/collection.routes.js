import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as controller from "./collection.controller.js";

const router = Router();

router.post("/books", asyncHandler(controller.createBooksCollection));
router.post("/authors", asyncHandler(controller.createAuthorsCollection));
router.post("/logs/capped", asyncHandler(controller.createCappedLogs));
router.post("/books/index", asyncHandler(controller.createTitleIndex));

export default router;
