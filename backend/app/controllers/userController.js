const bcrypt = require('bcryptjs');
const model = require('../models/userModel');

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

            if(isRegistered.length > 0){
                return res.status(400).json({error: 'Registration failed. Email is already registered.'})
            }

            const status = await model.addUser(first_name, last_name, email, pw_hashed);

            if(status){
                return res.status(200).json({message: 'User registered successfully.' })
            }

        }catch(error){
            res.status(500).json({ error: error.message });
        }
    }

    static async logUser(req, res){
        const email = req.body.email;
        const password = req.body.password;
        const isRegistered = await UserController.isUserRegistered(email);
        
        if(isRegistered.length === 0){
            return res.status(400).json({error: 'Log in failed. User not found.'})
        }else{
            const verified = bcrypt.compareSync(password, isRegistered[0].password);
            if(!verified){
                return res.status(400).json({error: 'Log in failed. Incorrect credentials.'})
            }else{
                req.session.user = isRegistered[0];
                return res.status(200).json({ user: isRegistered[0], message: 'Log in successful.' });
            }
        }
    }

    static async getHours(id){
        try{
            return await model.getHours(id);
        }catch(error){
            console.error('Unable to retrieve tracked hours for this user.');
        }
    }

    static async saveHours(timer, id){
        try{
            return await model.saveHours(timer, id);
        }catch(error){
            console.error('Unable to save tracked hours for this user.');
        }
    }

    static async logOff(req, res){
        req.session.destroy();
    }
}

module.exports = UserController;