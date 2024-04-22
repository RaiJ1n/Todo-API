const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    todo: String
});

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo