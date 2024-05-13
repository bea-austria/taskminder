const bcrypt = require('bcryptjs');
const model = require('../models/userModel');
const check = require("express-validator");
const { validationResult } = check;

class UserController{

    static async isUserRegistered(email){
        try{
            const status = await model.fetchUser(email);
            return status
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
            const pw_hashed = bcrypt.hashSync(password, 10)
            const isRegistered = await this.isUserRegistered(email)

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.send(errors.array());
            }

            if(isRegistered.length > 0){
                return res.json({error: 'Registration failed. Email is already registered.'})
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
            const verified = bcrypt.compareSync(password, isRegistered[0].password);
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.json({ errors: errors.array() });
            }
            
            if(isRegistered.length === 0){
                return res.json({error: 'Log in failed. User not found.'})
            }

            if(!verified){
                return res.json({error: 'Log in failed. Incorrect credentials.'})
            }

            req.session.user = isRegistered[0];
            res.status(200).json({ user: isRegistered[0], message: 'Log in successful.' });  
        }catch(error){
            res.json({ error: "User log in failed. Try again later." });
        }
    }

    static async logOff(req, res){
        req.session.destroy();
        res.sendStatus(200);
    }
}

module.exports = UserController;