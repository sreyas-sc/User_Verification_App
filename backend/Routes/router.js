const express = require('express');

const userController = require('../Controller/userController');
const emailController = require('../Controller/emailController')
const jwtMiddleware = require('../Middleware/jwtMiddleware')

const router = express.Router();

//register user
router.post('/register',userController.register)

//login
router.post('/login',userController.login)

//verify email address
router.post('/verify-email',emailController.emailVerify)

//verify entered otp
router.post('/verify-otp',emailController.verifyOtp)

module.exports = router