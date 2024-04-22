const express = require('express')

// ES 5 Require

const todoController = require('../controller/TodoController.js')

const router = express.Router();


router.get('/todos', todoController.getUsers)


module.exports = router;