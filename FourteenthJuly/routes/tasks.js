const express = require('express');
const router = express.Router();

let tasks = []; // In-memory storage
let taskId = 1;

// Add Task
router.post('/', (req, res) => {
    const { title, description, dueDate, priority = 'Low', category = 'General' } = req.body;

    if (!title) return res.status(400).json({ error: "Title is required" });

    const task = {
        id: taskId++,
        title,
        description,
        dueDate,
        priority,
        category,
        completed: false,
        createdAt: new Date()
    };
    tasks.push(task);
    res.status(201).json(task);
});

// Get All Tasks (with optional filtering)
router.get('/', (req, res) => {
    const { status, priority, category } = req.query;
    let filtered = [...tasks];

    if (status === 'completed') filtered = filtered.filter(t => t.completed);
    else if (status === 'pending') filtered = filtered.filter(t => !t.completed);

    if (priority) filtered = filtered.filter(t => t.priority.toLowerCase() === priority.toLowerCase());
    if (category) filtered = filtered.filter(t => t.category.toLowerCase() === category.toLowerCase());

    res.json(filtered);
});

// Edit Task
router.put('/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ error: "Task not found" });

    const { title, description, dueDate, priority, category } = req.body;
    if (title) task.title = title;
    if (description) task.description = description;
    if (dueDate) task.dueDate = dueDate;
    if (priority) task.priority = priority;
    if (category) task.category = category;

    res.json(task);
});

// Mark as Complete/Incomplete
router.patch('/:id/toggle', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ error: "Task not found" });

    task.completed = !task.completed;
    res.json(task);
});

// Delete Task
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return res.status(404).json({ error: "Task not found" });

    const deleted = tasks.splice(index, 1);
    res.json({ message: "Task deleted", task: deleted[0] });
});

module.exports = router;
