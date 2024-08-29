const users = require('../Models/userSchema')

const jwt = require('jsonwebtoken')

const nodemailer = require("nodemailer");

const otpGenerator = require('otp-generator')

exports.register = async(req,res) => {
    const {name,email,phone,aadhar,dob,password} = req.body;
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("User already exsists")
        }
        else{
            const newUser = new users({
                name,
                email,
                email_verify:false,
                phone,
                phone_verify:false,
                aadhar,
                aadhar_verify:false,
                dob,
                password
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch(err){
        res.status(500).json(err)
    }
}

exports.login = async(req,res) => {
    console.log('Inside Login Method');
    const {email,password} = req.body
    try{
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            const token = jwt.sign({userId:existingUser._id},"superkey")
            console.log(token);
            res.status(200).json({existingUser,token})
        }
        else{
            res.status(404).json('Invalid email or password')
        }
    }
    catch(err){
        res.status(500).json('Login failed'+err)
    }
}

