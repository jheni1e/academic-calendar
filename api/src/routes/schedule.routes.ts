import { Router } from "express";
import { SchedulerController } from "../controllers/SchedulerController.ts";
import { validateCreateLessonSeries } from "../shared/middlewares/scheduler.middleware.ts";

const router = Router();

router
    .post("/lessons", validateCreateLessonSeries, SchedulerController.createLessonSeries);

export default router;