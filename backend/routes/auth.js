const router = require('express').Router();
const User= require('../models/user.model.js');

router.post('/register', async (req,res)=>{

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
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