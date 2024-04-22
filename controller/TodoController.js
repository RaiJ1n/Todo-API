const Todo = require('../model/Todo.Model.js');

exports.getTodo = async (req, res) => {
    try {
        const todos = await Todo.find().exec();
        if (todos.length > 0) {
            return res.status(200).json({
                status: "Success",
                content: todos
            });
        } else {
            return res.status(204).json({
                status: "Success",
                content: "No todo found"
            });
        }
    } catch (err) {
        console.error("Error retrieving todo:", err);
        return res.status(404).json({
            status: "Error",
            message: "Failed to retrieve todo"
        });
    }
}

