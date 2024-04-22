const express = require('express')

// ES 5 Require

const todoController = require('../controller/TodoController.js')

const router = express.Router();


router.get('/todos', todoController.getTodo)
router.post('/create', todoController.postCreate)
router.patch('/update/:id', todoController.patchUpdate)
router.delete('/delete/:id', todoController.deleteTodo)
module.exports = router;