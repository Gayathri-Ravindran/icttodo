const express = require('express');
const router = express.Router();
const TodoModel = require('../model/auth');

router.use(express.json());

router.get('/', async (req, res) => {
    try {
        const todos = await TodoModel.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/todopost', async (req, res) => {
    const newTodo = new TodoModel({
        description: req.body.description,
        status: req.body.status
    });
    try {
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await TodoModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Todo deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const { description, status } = req.body;
    try {
        const updatedTodo = await TodoModel.findByIdAndUpdate(req.params.id, { description, status }, { new: true });
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
