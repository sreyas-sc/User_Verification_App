require('dotenv').config()

const express = require('express')

const session = require('express-session');

const cors = require('cors')

const db = require('./DB/Connection')

const router = require('./Routes/router')

const crypto = require('crypto');
const secret_key = crypto.randomBytes(64).toString('hex');

const Server = express()

Server.use(cors({
    origin: 'http://localhost:3000', // Replace with your Next.js origin in production
    credentials: true // Allow credentials (cookies) to be sent
}));

Server.use(express.json())

Server.use(session({
    secret: 'secret_key', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure to true if using HTTPS
}));

Server.use(router)

const PORT = 4000 || process.env.PORT

Server.listen(PORT,() => {
    console.log(`PServer listening on port `+PORT);
})

Server.get('/',(req,res) => {
    res.send('Server is running')
})


