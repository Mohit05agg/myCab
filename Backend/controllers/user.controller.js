const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const {validationResult} = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');


 // this will register the user
module.exports.registerUser = async(req, res, next)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){ // is email, firstname, password are according to required field then only proceed 
        return res.status(400).json({errors:errors.array() });
    }

    const {fullname, email, password } = req.body;

    const hashedPassword = await userModel.hashedPassword(password); // hash password

    const user = await userService.createUser({  // create user
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken(); // generate token
    
    res.cookie('token', token); // set token in cookie
    
    res.status(201).json({token , user});



}

// this will login the user
module.exports.loginUser = async(req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array() });
    }

    const {email, password} = req.body; // this will give email and password from body

    // check for user already exist all not
    const user = await userModel.findOne({emial}).select('+password');

    if(!user){
        return res.status(401).json({message:'Invalid email or password'});
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message:'Invalid email or password'});
    }

    const token = user.generateAuthToken();

    res.status(200).json({token, user});

}

// this will get the user profile
module.exports.getuserProfile = async(req, res, next)=>{
    res.status(200).json(req.user);
}

// this will logout the user
module.exports.logoutUser = async(req, res, next)=>{
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    await blacklistTokenModel.create({token});

    res.status(200).json({message:'Logout successfully'});
}


        
