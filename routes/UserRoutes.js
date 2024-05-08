const express = require('express')

const userController = require('../controller/User.Controller.js')

const authController = require('../controller/AuthController.js')

const router = express.Router()

router.get('/users',userController.getUsers)
router.post('/register', authController.registerUser)
router.post('/login',authController.login)

module.exports = router








