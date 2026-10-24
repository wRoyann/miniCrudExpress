import Task from "../models/taskModel.js";

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });

        res.status(200).json(tasks);
    } catch (error) {
        console.error("Failed to fetch tasks: ", error.message);
        res.status(500).json({ message: "Failed to fetch tasks" });
    }
};

export const createTask = async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            user: req.user.id,
        });

        if (!task.title) {
            return res.status(400).json({ message: "Title is required" });
        }

        await task.save().then((savedTask) => {
            res.status(201).json(savedTask);
        });
    } catch (err) {
        console.error("Failed to create task: ", err.message);
        res.status(500).json({ message: "Failed to create task" });
    }
};

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (req.body.status !== undefined) {
            task.status = req.body.status;
        }

        if (req.body.priority !== undefined) {
            task.priority = req.body.priority;
        }
        await task.save().then((updatedTask) => {
            res.status(200).json(updatedTask);
        });
    } catch (err) {
        console.error("Failed to update task: ", err.message);
        res.status(500).json({ message: "Failed to update task" });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        console.error("Failed to delete task: ", err.message);
        res.status(500).json({ message: "Failed to delete task" });
    }
};
