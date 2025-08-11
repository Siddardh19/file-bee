const express= require('express');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const userModel=require('../models/user.models')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

// /user/test
router.get('/register',(req,res)=> {
    res.render('register')
})

router.post('/register', 
    body('username').trim().isLength({min: 3}),
    body('email').trim().isEmail().isLength({min: 13}),
    body('password').trim().isLength({min:3}),
    async (req,res)=> {
    const errors=validationResult(req)
    
    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: 'Invalid data' 
        }) 
    }

    const {username, email, password} = req.body;

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = await userModel.create({
        username,
        email,
        password: hashPassword
    })

    res.json(newUser)
})

router.get('/login',(req,res)=> {
    res.render('login')
})

router.post('/login' , 
    body('username').trim().isLength({min: 3}),
    body('password').trim().isLength({min: 3}),
    async (req,res) => {
       
        const errors =validationResult(req)
        
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid data'
            })
        }

        const {username, password} =req.body;

        const user = await userModel.findOne({
            username: username
        })

        if(!user) {
            return res.status(400).json({
                message: 'username or password is incorrect'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({
                message: 'username or password is incorrect'
            })
        }
        
        const token= jwt.sign({
            userId: user._id,
            email: user.email,
            username: user.username
        }, 
        process.env.JWT_SECRET,
      )

      res.cookie('token', token)

      res.send('logged in')

    })

module.exports=router;

//This code creates a router that handles user registration with two routes -
//  a GET route to display the registration form and a POST route to process registration data with validation,
//  create a new user in the database, and return the result.