const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken')
const User= require('../models/user.model.js');
const {registerValidation,loginValidation} = require('../validation');

//Register Route /api/user/register
router.post('/register', async (req,res)=> {

    //User validation befor Save
    const {error} = registerValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    // check if e-mail existe on DB
    const emailexist= await User.findOne({email:req.body.email});
    if(emailexist) return res.status(400).send('email already existe');

    // check if username existe on DB
    const usernameexist= await User.findOne({username:req.body.username});
    if(usernameexist) return res.status(400).send('username already existe');

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });
    
    // save user on DB
    try {
        const savedUser = await user.save();
        res.send({user: user._id}); 
    } catch (error) {
        res.status(400).send(error);
    }
});

//Login Route /api/user/login
router.post('/login', async (req,res)=>{

    //User validation befor login
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // check if e-mail existe 
    const user= await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('email not found');

    // compare password with the hash
    const validPass= await bcrypt.compare(req.body.password , user.password);
    if(!validPass) return res.status(400).send('password is wrong');

    //assign a token
    const token =jwt.sign({_id: user._id} , process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});

router.post('/', (req,res)=>{
    res.send('Home');

});

module.exports= router;