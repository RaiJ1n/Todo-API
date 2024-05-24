const express = require('express')

// ES 5 Require

const todoController = require('../controller/TodoController.js')
const checkUser = require('../middleware/checkUser.js')
const router = express.Router();


router.get('/all/task', checkUser.verifyToken, todoController.getTask)
router.post('/task', checkUser.verifyToken, todoController.createTask)
router.patch('/update/task/:id', checkUser.verifyToken, todoController.updateTask)
router.delete('/delete/:id', checkUser.verifyToken, todoController.deleteTask)

module.exports = router;