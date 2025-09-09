const express = require('express');
const router = express.Router();
const { getAllTasks, createTask, getTask, updateTask, deleteTask } = require('../controllers/taskController')


router.get('/list', getAllTasks);
router.post('/create', createTask);
router.get('/getOne/:id', getTask);
router.put('/update/:id', updateTask);
router.get('/delete/:id', deleteTask);



module.exports = router;