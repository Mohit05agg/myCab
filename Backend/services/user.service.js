// this service will create the user
const userModel = require("../models/user.model");




module.exports.createUser = async({
    firstname, lastname, email, password
})=> {
    // simplyc checks input if valid then creat a user
    if(!firstname || !email|| !password){
        throw new Error('All fields are required');
    }
    const user = userModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    })
    return user;
}