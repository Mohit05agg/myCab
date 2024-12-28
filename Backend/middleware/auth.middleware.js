const userModel = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');

// middleware for chehc if user is authenticated or not
module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];// get the token form header or cookies
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' }); // if token not found then return unauthorized
    }
    const isBlacklisted = await userModel.findOne({blacklisted: token }); // check if token is blacklisted or not

    if(isBlacklisted){
        return res.status(401).json({message:'Unauthorized'});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify the token
        const user = await userModel.findById(decoded._id);     // find the user by id

        req.user = user; // set the user in request
        return next();  // move to next middleware


    }
    catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports.authCaptain = async (req, res, next) => {    
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // get the token form header or cookies
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' }); // if token not found then return unauthorized
    }
    const isBlacklisted = await blacklistedTokenModel.findOne({token: token}); // check if token is blacklisted or not

    if(isBlacklisted){
        return res.status(401).json({message:'Unauthorized'});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify the token
        const captain = await captainModel.findById(decoded._id); // find the captain by id

        req.captain = captain; // set the captain in request
        return next(); // move to next middleware

    }
    catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}   