const express = require("express");
const mongoose = require('mongoose');
const app = express();
const port = 4000;
const todoRoutes = require('./routes/TodoRoutes');
const cookieParser = require("cookie-parser");


app.set("view engine", "ejs");
app.use(express.urlencoded({
    extended: true,
}))
app.use(express.json());
app.use(cookieParser())

app.use('/api/v1/', todoRoutes)

mongoose
    .connect("mongodb://127.0.0.1:27017/tododb")
    .then(() => console.log("Connected to Database"))
    .catch((err) => console.error("Error connecting to database"));

app.listen(port, function () {
    console.log("Server is running on port " + port);
});
