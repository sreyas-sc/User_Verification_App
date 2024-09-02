const express = require('express');
// const express = require('express');
// const router = express.Router();


// const aadharController = require('../Controller/aadharController');
const aadharController = require('../Controller/aadharController');
const userController = require('../Controller/userController');
const emailController = require('../Controller/emailController');
const phoneController = require('../Controller/phoneController'); // Import phone controller
const panController = require('../Controller/panController');
const jwtMiddleware = require('../Middleware/jwtMiddleware');
const addressController = require('../Controller/addressController');
const gstController = require('../Controller/gstController');



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
router.post('/send-phone-otp', phoneController.sendPhoneOtp); // Added phone OTP route

// Verify entered OTP for phone
router.post('/verify-phone-otp', phoneController.verifyPhoneOtp); // Added phone OTP verification route


// Validate aadhar 
router.post('/verify-aadhaar', aadharController.verifyaadhaar);

router.post('/verify-pan', panController.verifyPanCard);


router.get('/pincode/:pincode', addressController.getPincodeDetails);

router.post('/verify-gst', gstController.verifyGst); 

module.exports = router;
