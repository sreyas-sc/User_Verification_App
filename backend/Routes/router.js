// const express = require('express');

// const userController = require('../Controller/userController');
// const emailController = require('../Controller/emailController')
// const jwtMiddleware = require('../Middleware/jwtMiddleware')

// const router = express.Router();

// //register user
// router.post('/register',userController.register)

// //login
// router.post('/login',userController.login)

// //verify email address
// router.post('/verify-email',emailController.emailVerify)

// //verify entered otp
// router.post('/verify-otp',emailController.verifyOtp)

// module.exports = router


const express = require('express');

const userController = require('../Controller/userController');
const emailController = require('../Controller/emailController');
const phoneController = require('../Controller/phoneController'); // Import phone controller
const jwtMiddleware = require('../Middleware/jwtMiddleware');

const router = express.Router();

// Register user
router.post('/register', userController.register);

// Login
router.post('/login', userController.login);

// Verify email address
router.post('/verify-email', emailController.emailVerify);

// Verify entered OTP for email
router.post('/verify-otp', emailController.verifyOtp);

// Send OTP to phone for verification
router.post('/send-phone-otp', phoneController.phoneVerify); // Added phone OTP route

// Verify entered OTP for phone
router.post('/verify-phone-otp', phoneController.verifyPhoneOtp); // Added phone OTP verification route

module.exports = router;
