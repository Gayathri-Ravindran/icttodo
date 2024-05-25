const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    description: String,
    status: String
});

const TodoModel = mongoose.model('Todo', todoSchema);
module.exports = TodoModel;
