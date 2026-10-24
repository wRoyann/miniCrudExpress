import express from "express";
import userRoute from "./userRoute.js";
import taskRoute from "./taskRoute.js";

const router = express.Router();

router.use("/auth", userRoute);
router.use("/tasks", taskRoute);

export default router;
