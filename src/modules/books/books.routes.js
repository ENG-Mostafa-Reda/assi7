import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as controller from "./books.controller.js";

const router = Router();

router.post("/", asyncHandler(controller.addBook));
router.post("/batch", asyncHandler(controller.addBooksBatch));

router.get("/title", asyncHandler(controller.getBookByTitle));
router.get("/year", asyncHandler(controller.getBooksByYearRange));
router.get("/genre", asyncHandler(controller.getBooksByGenre));
router.get("/skip-limit", asyncHandler(controller.skipLimitBooks));
router.get("/year-integer", asyncHandler(controller.getBooksYearInteger));
router.get("/exclude-genres", asyncHandler(controller.excludeGenres));

router.get("/aggregate1", asyncHandler(controller.aggregate1));
router.get("/aggregate2", asyncHandler(controller.aggregate2));
router.get("/aggregate3", asyncHandler(controller.aggregate3));
router.get("/aggregate4", asyncHandler(controller.aggregate4));

router.delete("/before-year", asyncHandler(controller.deleteBooksBeforeYear));
router.patch("/:title", asyncHandler(controller.updateBookYear));

export default router;
