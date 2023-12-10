const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET_KEY = "Abhikis#goodboy";


// ROUTE-1 : Create a user using: POST "/api/auth/createuser" (No login required)
router.post('/createuser', [
    body('email', 'Enter a valid Email ID :(').isEmail(),
    body('name', 'Enter a valid name :(').isLength({ min:3 }),
    body('password', 'Password must be at least 5 characters :(').isLength({ min:5 })
], async (req, res)=>{
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ success, errors:errors.array() });
    }

    try{
        let user = await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({ success, error:"Sorry :( A user with this email already exists..." })
        }

        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePassword
        });

        const data = {
            user:{
                id:user.id
            }
        }
        const JWTToken = jwt.sign(data, JWT_SECRET_KEY);
        success = true;
        res.json({ success, JWTToken });
    }

    catch(err){
        console.error(err.message);
        res.status(500).send("Internal Server Error :(");
    }
});


// ROUTE-2 : Authenticate a user using: POST "/api/auth/login" (No login required)
router.post('/login', [
    body('email', 'Enter a valid Email ID :(').isEmail(),
    body('password', 'Password cannot be blank :(').exists()
], async (req, res)=>{
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ success, errors:errors.array() });
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ success, error:"Please try to login with correct credentials :(" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({ success, error:"Please try to login with correct credentials :(" });
        }

        const data = {
            user:{
                id:user.id
            }
        }
        const JWTToken = jwt.sign(data, JWT_SECRET_KEY);
        success=true;
        res.json({success, JWTToken});
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error :(");
    }
});


// ROUTE-3 : Get user detail using: POST "/api/auth/getuser" (Login required)
router.post('/getuser', fetchuser, async (req, res)=>{
    try{
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error :(");
    }
});





module.exports = router