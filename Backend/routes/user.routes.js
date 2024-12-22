const express = require('express');
const router = express.Router();
const {body} = require("express-validator")
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth')

// 3 details we r going to validate email , firstname, password

// 1. email must be valid
// 2. firstname must be at least 3 character long
// 3. password must be at least 6 character long

// if any of the above condition is not satisfied then we will send error message
// if all the above condition is satisfied then we will proceed further

// route for register user
router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min:3}).withMessage('First name must be least 3 character long'),
    body('password').isLength({ min:6 }).withMessage('Password must be at least 6 character long')
],
    userController.registerUser
)

// route for login user
router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min:6 }).withMessage('Password must be at least 6 character long')
],
    userController.loginUser
)

//route for user profile
router.get('/profile', authMiddleware.authUser, userController.getuserProfile)

//route for logout
router.get('/logout', authMiddleware.authUser, userController.logoutUser)




module.exports = router;