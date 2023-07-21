import express from "express";
import {
	getAllTasks,
	getTask,
	deleteTask,
	updateTask,
	createTask,
} from "../controllers/tasks.js";

const router = express.Router();

router.get("/", getAllTasks);
router.post("/", createTask);
router.get("/:id", getTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
