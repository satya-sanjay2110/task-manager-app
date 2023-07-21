import Task from "../models/Task.js";
import { asyncWrapper } from "../middleware/async.js";
import { CustomAPIError, createCustomError } from "../errors/custom-error.js";

export const getTask = asyncWrapper(async (req, res, next) => {
	const { id: taskID } = req.params;
	const task = await Task.findOne({ _id: taskID });

	if (!task) {
		return next(createCustomError(`No task with id:${taskID}`, 404));
	}

	res.status(200).json({ task });
});

export const getAllTasks = asyncWrapper(async (req, res) => {
	const allTasks = await Task.find({});
	res.status(200).json({ allTasks });
});

export const createTask = asyncWrapper(async (req, res) => {
	const task = await Task.create(req.body);
	res.status(201).json({ task });
});

export const updateTask = asyncWrapper(async (req, res) => {
	const { id: taskID } = req.params;
	const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {
		new: true,
		runValidators: true,
	});

	if (!task) {
		return next(createCustomError(`No task with id:${taskID}`, 404));
	}

	res.status(200).json({ task });
});

export const deleteTask = asyncWrapper(async (req, res) => {
	const { id: taskID } = req.params;
	const task = await Task.findOneAndDelete({ _id: taskID });

	if (!task) {
		return next(createCustomError(`No task with id:${taskID}`, 404));
	}

	res.status(200).json({ task });
});