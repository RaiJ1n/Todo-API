const Todo = require('../model/Todo.Model.js');
const User = require('../model/User.Model.js')

exports.createTask = async (req, res) => {
    console.log(req.user._id)
    const {todo, id} = req.body

    try {
        const getCurrentUser = await User.findOne ({_id: req.user._id})
        console.log(getCurrentUser);
        const newTask = new Todo({
            todo: todo
        })
        await newTask.save()
        getCurrentUser.taskList.push(newTask)
        await getCurrentUser.save()
        res.status(200).json({
            content: getCurrentUser,
            message: "Tasked created successfully"
        })
    } catch (err) {
        res.status(403).json({
            status: "Failed",
            content: err
        });
    }
}

exports.getTask = async (req, res) => {
    console.log(req.user.email)
    
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