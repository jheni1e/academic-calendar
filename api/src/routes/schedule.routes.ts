import { Router } from "express";
import { SchedulerController } from "../controllers/SchedulerController.ts";

const router = Router();

router
    .post("/lessons", SchedulerController.createLessonSeries);

export default router;