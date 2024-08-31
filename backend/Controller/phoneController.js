// backend\controller\phoneController.js

const users = require('../Models/userSchema');
const twilio = require('twilio');
const otpGenerator = require('otp-generator');

const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.phoneVerify = async (req, res) => {
    const { phone } = req.body;
    try {
        const existingUser = await users.findOne({ phone });
        if (existingUser) {
            const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
            const otpExpiry = Date.now() + 4 * 60 * 1000;

            req.session.otp = otp;
            req.session.phone = phone;
            req.session.otpExpiry = otpExpiry;

            await client.messages.create({
                body: `Your OTP for phone verification is ${otp}`,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: phone
            });

            res.send("OTP sent successfully!");
        } else {
            res.status(404).send("User not found");
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.verifyPhoneOtp = async (req, res) => {
    const { phone, otp } = req.body;

    if (!req.session.otp || !req.session.phone || !req.session.otpExpiry) {
        return res.status(400).json("No OTP found. Please request a new one.");
    }

    const currentTime = Date.now();
    if (currentTime > req.session.otpExpiry) {
        req.session.otp = null;
        req.session.phone = null;
        req.session.otpExpiry = null;
        return res.status(400).json("OTP has expired. Please request a new one.");
    }

    if (req.session.otp === otp && req.session.phone === phone) {
        try {
            const updateResult = await users.findOneAndUpdate(
                { phone: req.session.phone },
                { $set: { 'isVerified.phone': true } },
                { new: true }
            );

            if (updateResult) {
                res.send("Phone verified successfully!");

                req.session.otp = null;
                req.session.phone = null;
                req.session.otpExpiry = null;
            } else {
                res.status(500).json("Failed to update phone verification status.");
            }
        } catch (error) {
            console.error("Error updating phone verification status:", error);
            res.status(500).json("Error updating phone verification status.");
        }
    } else {
        res.status(400).json("Invalid OTP or phone number.");
    }
};
