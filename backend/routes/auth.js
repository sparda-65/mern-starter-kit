const router = require('express').Router();
const User= require('../models/user.model.js');

//Validation
const Joi= require('@hapi/joi');

const userSchema= Joi.object().keys({
    username: Joi.string()
    .min(6)
    .required(),
    email: Joi.string()
    .min(6)
    .required()
    .email(),
    password: Joi.string()
    .min(8)
    .required()
});

router.post('/register', async (req,res)=> {

    //User validation befor Save
    const {error} = userSchema.validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    
    // save user on DB
    try {
        const savedUser = await user.save();
        res.send(savedUser); 
        console.log(savedUser);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/login', (req,res)=>{
    res.send('Login');

});

router.post('/', (req,res)=>{
    res.send('Home');

});

module.exports= router;