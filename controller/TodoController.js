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

exports.postCreate = async (req, res) => {
    const { todo } = req.body;
    try {
        const newTodo = await Todo.create({ todo });
        res.status(200).json({
            status: "Successfully added",
            content: newTodo
        });
    } catch (err) {
        res.status(403).json({
            status: "Failed",
            content: err
        });
    }
    console.log("New Todo created" + todo);
}

exports.patchUpdate = async (req, res) => {
    console.log(req.params.id);
    const todoid = req.params.id;
    try {
        const updateTodo = await Todo.findByIdAndUpdate(
            todoid, {
                todo: "car wash updated",
            }, {
                runValidators: true,
                new: true,
            }
        );
        console.log(updateTodo);
        if (updateTodo) {
            return res.status(200).json({
                status: "Successfully Changed",
                content: updateTodo
            });
        }
        return res.status(203).json({
             message: "Todo not found" 
            });
    } catch (err) {
        console.error("Error updating todo:", err);
        return res.status(403).json({ 
            message: "Internal server error" 
        });
    }
}

exports.deleteTodo = async (req, res) => {
    console.log(req.params.id);
    const todoid = req.params.id
    try {
        await Todo.findOneAndDelete({
            _id: todoid
        })
        res.status(200).json({
            status: "Successfully Deleted",
        });
        console.log("Successfully Deleted");
    } catch (err) {
        console.log(err);
        res.status(403).json({
            status: "Failed to delete",
            content: err
        });
    }
}