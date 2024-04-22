const express = require("express");
const mongoose = require('mongoose');
const app = express();
const port = 4000;
const todoRoutes = require('./routes/TodoRoutes')


app.set("view engine", "ejs");
app.use(express.json());

app.use('/api/v1/', todoRoutes)

app.post('/create', async function (req, res) {
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
    console.log("New Todo created" + Todo);
});





app.patch("/changetodo/:id", async function (req, res) {
    console.log(req.params.id);
    const todoid = req.params.id;
    try {
        const updateTodo = await Todo.findByIdAndUpdate(
            todoid, {
                todo: "make bed updated",
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
});

app.delete("/deletetodo/:id", async function (req,res){
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
})
mongoose
    .connect("mongodb://127.0.0.1:27017/tododb")
    .then(() => console.log("Connected to Database"))
    .catch((err) => console.error("Error connecting to database"));

app.listen(port, function () {
    console.log("Server is running on port " + port);
});
