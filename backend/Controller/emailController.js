const users = require('../Models/userSchema')
const nodemailer = require("nodemailer");
const otpGenerator = require('otp-generator')

exports.emailVerify = async(req,res) => {
    const {email} = req.body;
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            const otp = otpGenerator.generate(6, {lowerCaseAlphabets:false, upperCaseAlphabets: false, specialChars: false });
            const otpExpiry = Date.now() + 4 * 60 * 1000;

            req.session.otp = otp;
            req.session.email = email; 
            req.session.otpExpiry = otpExpiry;
            

            const auth = nodemailer.createTransport({
                service: "gmail",
                secure: true,
                port: 465,
                auth: {
                  user: process.env.email_id, 
                  pass:  process.env.pass_key
                }
              });

              const receiver = {
                from: "sreyas.sc@gmail.com",
                to: email, 
                subject: "OTP for Verification",
                text: `Hi,
              
              Thank you for registering. Please use the following OTP to verify your email address:
              
              OTP: ${otp}`
              };

              
              auth.sendMail(receiver, (error, emailResponse) => {
                if (error) {
                  console.error("Error sending email:", error);
                  return res.status(500).send("Error sending email"); // Send an error response if email fails to send
                }
                res.send("Email sent successfully!"); // Send a success response
              });
        }
    }
    catch(err){
        res.status(500).json(err)
    }
}

exports.verifyOtp = (req, res) => {
  const { email, otp } = req.body;

  // Check if OTP, email, and expiration time exist in the session
  if (!req.session.otp || !req.session.email || !req.session.otpExpirationTime) {
      return res.status(400).json("No OTP found. Please request a new one.");
  }

  // Check if the OTP has expired
  const currentTime = Date.now();
  if (currentTime > req.session.otpExpirationTime) {
      // OTP has expired
      req.session.otp = null;
      req.session.email = null;
      req.session.otpExpirationTime = null;
      return res.status(400).json("OTP has expired. Please request a new one.");
  }

  // Verify the OTP and email
  if (req.session.otp === otp && req.session.email === email) {
      // OTP is correct and within the valid time
      res.send("OTP verified successfully!");

      // Clear the OTP and related data from the session after verification
      req.session.otp = null;
      req.session.email = null;
      req.session.otpExpirationTime = null;
  } else {
      // OTP or email is incorrect
      res.status(400).json("Invalid OTP or email.");
  }
};
