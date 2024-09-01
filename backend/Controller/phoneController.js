// // const users = require('../Models/userSchema');
// // const twilio = require('twilio');
// // const otpGenerator = require('otp-generator');

// // const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// // exports.phoneVerify = async (req, res) => {
// //     const { phone } = req.body;
// //     try {
// //         const existingUser = await users.findOne({ phone });
// //         if (existingUser) {
// //             const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
// //             const otpExpiry = Date.now() + 4 * 60 * 1000;

// //             req.session.otp = otp;
// //             req.session.phone = phone;
// //             req.session.otpExpiry = otpExpiry;

// //             await client.messages.create({
// //                 body: `Your OTP for phone verification is ${otp}`,
// //                 from: process.env.TWILIO_PHONE_NUMBER,
// //                 to: phone
// //             });

// //             res.send("OTP sent successfully!");
// //         } else {
// //             res.status(404).send("User not found");
// //         }
// //     } catch (err) {
// //         console.error("Error in phoneVerify:", err);
// //         res.status(500).json({ error: "Internal Server Error" });
// //     }
// // };

// // exports.verifyPhoneOtp = async (req, res) => {
// //     const { phone, otp } = req.body;

// //     if (!req.session.otp || !req.session.phone || !req.session.otpExpiry) {
// //         return res.status(400).json("No OTP found. Please request a new one.");
// //     }

// //     const currentTime = Date.now();
// //     if (currentTime > req.session.otpExpiry) {
// //         req.session.otp = null;
// //         req.session.phone = null;
// //         req.session.otpExpiry = null;
// //         return res.status(400).json("OTP has expired. Please request a new one.");
// //     }

// //     if (req.session.otp === otp && req.session.phone === phone) {
// //         try {
// //             const updateResult = await users.findOneAndUpdate(
// //                 { phone: req.session.phone },
// //                 { $set: { 'isVerified.phone': true } },
// //                 { new: true }
// //             );

// //             if (updateResult) {
// //                 req.session.otp = null;
// //                 req.session.phone = null;
// //                 req.session.otpExpiry = null;
// //                 res.send("Phone verified successfully!");
// //             } else {
// //                 res.status(500).json("Failed to update phone verification status.");
// //             }
// //         } catch (error) {
// //             console.error("Error updating phone verification status:", error);
// //             res.status(500).json({ error: "Internal Server Error" });
// //         }
// //     } else {
// //         res.status(400).json("Invalid OTP or phone number.");
// //     }
// // };


// const users = require('../Models/userSchema');
// const twilio = require('twilio');
// const otpGenerator = require('otp-generator');

// const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// const validatePhoneNumber = (phoneNumber) => {
//     const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/; // E.164 format
//     return phoneNumberPattern.test(phoneNumber);
// };

// exports.phoneVerify = async (req, res) => {
//     const { phone } = req.body;

//     if (!validatePhoneNumber(phone)) {
//         return res.status(400).json({ error: 'Invalid phone number format.' });
//     }

//     try {
//         const existingUser = await users.findOne({ phone });
//         if (existingUser) {
//             const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
//             const otpExpiry = Date.now() + 4 * 60 * 1000;

//             req.session.otp = otp;
//             req.session.phone = phone;
//             req.session.otpExpiry = otpExpiry;

//             try {
//                 await client.messages.create({
//                     body: `Your OTP for phone verification is ${otp}`,
//                     from: process.env.TWILIO_PHONE_NUMBER,
//                     to: phone
//                 });

//                 res.send("OTP sent successfully!");
//             } catch (twilioError) {
//                 console.error("Twilio Error:", twilioError);
//                 res.status(500).json({ error: "Failed to send OTP via Twilio." });
//             }
//         } else {
//             res.status(404).send("User not found");
//         }
//     } catch (err) {
//         console.error("Error in phoneVerify:", err);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// exports.verifyPhoneOtp = async (req, res) => {
//     const { phone, otp } = req.body;

//     if (!req.session.otp || !req.session.phone || !req.session.otpExpiry) {
//         return res.status(400).json("No OTP found. Please request a new one.");
//     }

//     const currentTime = Date.now();
//     if (currentTime > req.session.otpExpiry) {
//         req.session.otp = null;
//         req.session.phone = null;
//         req.session.otpExpiry = null;
//         return res.status(400).json("OTP has expired. Please request a new one.");
//     }

//     if (req.session.otp === otp && req.session.phone === phone) {
//         try {
//             const updateResult = await users.findOneAndUpdate(
//                 { phone: req.session.phone },
//                 { $set: { 'isVerified.phone': true } },
//                 { new: true }
//             );

//             if (updateResult) {
//                 req.session.otp = null;
//                 req.session.phone = null;
//                 req.session.otpExpiry = null;
//                 res.send("Phone verified successfully!");
//             } else {
//                 res.status(500).json("Failed to update phone verification status.");
//             }
//         } catch (error) {
//             console.error("Error updating phone verification status:", error);
//             res.status(500).json({ error: "Internal Server Error" });
//         }
//     } else {
//         res.status(400).json("Invalid OTP or phone number.");
//     }
// };


const users = require('../Models/userSchema');
const twilio = require('twilio');
const otpGenerator = require('otp-generator');

const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Function to validate and format phone number
const validateAndFormatPhoneNumber = (phoneNumber) => {
    // Remove any spaces or non-numeric characters
    const cleanedNumber = phoneNumber.replace(/[^\d]/g, '');

    // Ensure the number has exactly 10 digits
    if (cleanedNumber.length !== 10) {
        return null; // Invalid phone number
    }

    // Add the country code prefix
    return `+91${cleanedNumber}`;
};

exports.phoneVerify = async (req, res) => {
    const { phone } = req.body;

    // Log received phone number for debugging
    console.log("Received phone number:", phone);

    const formattedPhone = validateAndFormatPhoneNumber(phone);
    if (!formattedPhone) {
        console.error("Invalid phone number format:", phone);
        return res.status(400).json({ error: 'Invalid phone number format.' });
    }

    try {
        const existingUser = await users.findOne({ phone: formattedPhone });
        if (existingUser) {
            const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
            const otpExpiry = Date.now() + 4 * 60 * 1000;

            req.session.otp = otp;
            req.session.phone = formattedPhone;
            req.session.otpExpiry = otpExpiry;

            try {
                await client.messages.create({
                    body: `Your OTP for phone verification is ${otp}`,
                    from: process.env.TWILIO_PHONE_NUMBER,
                    to: formattedPhone
                });

                res.send("OTP sent successfully!");
            } catch (twilioError) {
                console.error("Twilio Error:", twilioError);
                res.status(500).json({ error: "Failed to send OTP via Twilio." });
            }
        } else {
            res.status(404).send("User not found");
        }
    } catch (err) {
        console.error("Error in phoneVerify:", err);
        res.status(500).json({ error: "Internal Server Error" });
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
                req.session.otp = null;
                req.session.phone = null;
                req.session.otpExpiry = null;
                res.send("Phone verified successfully!");
            } else {
                res.status(500).json("Failed to update phone verification status.");
            }
        } catch (error) {
            console.error("Error updating phone verification status:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.status(400).json("Invalid OTP or phone number.");
    }
};
