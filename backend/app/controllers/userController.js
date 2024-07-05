const bcrypt = require('bcryptjs');
const model = require('../models/userModel');
const check = require("express-validator");
const { generateToken, verifyToken} = require('../utils/jwtHelper');
const { validationResult } = check;
const sendPWResetEmail = require('../utils/resetPassword');

class UserController{

    static async isUserRegistered(email){
        try{
            return await model.fetchUser(email);
        }catch(error){
            return false;
        }
    };

    static async addUser(req, res){
        try{
            const first_name = req.body.firstName;
            const last_name = req.body.lastName;
            const email = req.body.email;
            const password = req.body.password;
            const pw_hashed = await bcrypt.hash(password, 10)
            const isRegistered = await UserController.isUserRegistered(email)

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.send(errors.array());
            }

            if(isRegistered.length > 0){
                return res.status(400).json({error: 'Registration failed. Email is already registered.'})
            }

            const status = await model.addUser(first_name, last_name, email, pw_hashed);

            if(status){
                res.status(200).json({message: 'User registered successfully.' })
            }

        }catch(error){
            res.json({ error: "User registration failed. Try again later." });
        }
    }

    static async logUser(req, res){
        try{
            const email = req.body.email;
            const password = req.body.password;
            const isRegistered = await UserController.isUserRegistered(email);
            const errors = validationResult(req);
            console.log(isRegistered[0])
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            
            if(isRegistered.length === 0){
                return res.status(400).json({error: 'Log in failed. User not found'});
            }
            
            const verified = await bcrypt.compare(password, isRegistered[0].password);
            if(!verified){
                return res.status(400).json({error: 'Log in failed. Incorrect credentials'});
            }

            const token = generateToken(isRegistered[0].id);
            const hashedToken = await bcrypt.hash(token, 10);
            await model.storeUserCookie(isRegistered[0].id, hashedToken);
            
            return res
                .cookie('loginToken', token, {
                httpOnly: true,
                secure: true,
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days in milliseconds
                })
                .status(200)
                .json({ user: isRegistered[0], message: 'Log in successful' }); 
        }catch(error){
            return res.json({ error: "User log in failed. Try again later" });
        }
    }

    static async getUsers(){
        try{
            return await model.getUsers();
        }catch(error){
            console.error('Unable to fetch user information');
        }
    }
    
    static async getUserById(id){
        try{
            return await model.getUserById(id);
        }catch(error){
            console.error('Unable to fetch user information');
        }
    }

    static async getUserCookie(id){
        try{
            return await model.getUserCookie(id);
        }catch(error){
            console.error('Unable to fetch user information');
        }
    }

    static async forgotPassword(req, res){
        try{
            const email = req.body.email;
            const isRegistered = await UserController.isUserRegistered(email);
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            if(isRegistered.length === 0){
                return res.status(400).json({error: 'User not found'});
            }
            const userId = isRegistered[0].id;
            const token = generateToken(userId);
            const hashedToken = await bcrypt.hash(token, 10)

            await model.storeUserPWToken(hashedToken, email);
            await sendPWResetEmail(email, token);
            res.status(200).json({message: 'Please check your email'})
        }catch(error){
            console.error('Unable to reset password.')
        }
    }

    static async verifyTokenValidity(req, res){
        try{
            const token = req.body.token;
            const decoded = verifyToken(token);
            const userId = decoded.userId;

            const user = await UserController.getUserById(userId);

            const verify = await bcrypt.compare(token, user[0].pw_reset_token);

            const unexpiredToken = await model.checkTokenExpiration(userId);

            if(!decoded || !verify || unexpiredToken.length === 0){
                return res.status(400).json('Your link is invalid. Please try requesting a new password reset link.');
            }else{
                return res.sendStatus(200);
            }
            
        }catch(error){
            console.error('Unable to verify token validity')
        }
    }

    static async resetPassword(req, res){
        try{
            const email = req.body.email;
            const password = req.body.password;
            const user = await UserController.isUserRegistered(email);
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const verify = await bcrypt.compare(password, user[0].password);
            if(verify){
                return res.status(400).json({error: 'New password cannot be the same as old password'})
            }

            const hashedPW = await bcrypt.hash(password, 10)
            await model.changePassword(hashedPW, user[0].id);
            return res.status(200).json({message: 'Password successfully changed'})
        }catch(error){
            console.error('Unable to reset password.')
        }
    }

    static async logOff(req, res){
        try{
            res.clearCookie('loginToken', req.cookies.loginToken, {
                httpOnly: true,
                secure: true, // Set to true in production
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days in milliseconds
                })
                req.session.destroy();
                res.sendStatus(200);
        }catch(error){
            console.error('Unable to log user off');
        }
    }
}

module.exports = UserController;