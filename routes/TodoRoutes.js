const express = require('express')

// ES 5 Require

const userController = require('../controller/TodoController.js')

const router = express.Router();


router.get('/todos', todoController.getUsers)


module.exports = router;