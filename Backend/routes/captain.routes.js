const captainController = require('../controllers/captain.controller'); 
const express = require('express');
const router = express.Router();
const {body} = require("express-validator")

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min:3}).withMessage('First name must be least 3 character long'),
    body('password').isLength({ min:6 }).withMessage('Password must be at least 6 character long'),
    body('vehicle.color').isLength({ min:3}).withMessage('Color must be least 3 character long'),
    body('vehicle.plate').isLength({ min:3}).withMessage('Plate must be least 3 character long'),
    body('vehicle.capacity').isLength({ min:1}).withMessage('Capacity must be least 1 character long'),
    body('vehicle.vehicleType').isLength({ min:3}).withMessage('Vehicle Type must be least 3 character long'),


],
    captainController.registerCaptain
)



module.exports = router;