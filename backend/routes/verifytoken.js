const jwt= require('jsonwebtoken');

function isAuth( req,res,next){

    //verify if token existe
    const token= req.header('auth-token');
    if(!token) return res.status(401).send('Acces denied');

    // verify token
    try {
        const verified= jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
    } catch (error) {
        res.status(400).send('Invalid token');
    }
}