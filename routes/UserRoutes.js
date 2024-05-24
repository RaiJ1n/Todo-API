const express = require('express')

const userController = require('../controller/User.Controller.js')
const authController = require('../controller/AuthController.js')
const checkUser = require('../middleware/checkUser.js')
const router = express.Router()

router.get('/users',userController.getUsers)
router.post('/register', authController.registerUser)
router.post('/login',authController.login)
router.patch('/changePassword/:id' ,checkUser.verifyToken ,authController.changePassword)
router.post('/logout/user', authController.logoutUser)
module.exports = router








