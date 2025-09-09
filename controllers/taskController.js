const Task = require('../models/taskModels');

// Get all tasks
const getAllTasks = async (req,res) => {
    try {
        const tasks = await Task.findAll();
        res.status(200).json(tasks);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
}




// Create the task
const createTask = async (req,res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}



// Get a single task
const getTask = async (req,res) => {
    try {
        const { id:taskId } = req.params;
        const task = await Task.findOne({
            where: { id: taskId }
        });

        if(!task) {
            return res.status(404).json({ error: `Task not found with id: ${taskId}` });
        }

        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}



// Update the task
const updateTask = async (req, res) => {
    try {
        const { id: taskId } = req.params;

        // Find by primary key
        const task = await Task.findOne({
            where: { id: taskId }
        });

        if (!task) {
            return res.status(404).json({ error: `Task not found with id: ${taskId}` });
        }

        // Update with data from request body
        await task.update(req.body);

        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};





// Delete the task
const deleteTask = async (req,res) => {
    try {
        const { id: taskId } = req.params;
        const task = await Task.findOne({
            where: { id: taskId }
        });

        if(!task) {
            res.status(404).json({ message: "Task not found" });
        } else {
            await task.destroy();
            return res.status(200).json({ error: `Task deleted successfully` });
        }


    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}





module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}