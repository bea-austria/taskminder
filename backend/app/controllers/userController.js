const bcrypt = require('bcryptjs');
const model = require('../models/userModel');

class UserController{

    static async addUser(req, res){
        try{
            console.log('helo')
            const first_name = req.body.firstName;
            const last_name = req.body.lastName;
            const email = req.body.email;
            const password = req.body.password;
            const pw_hashed = bcrypt.hashSync(password, 10)
            
            const status = await model.addUser(first_name, last_name, email, pw_hashed);

            if(status){
                console.log('successfully added');
            }

        }catch(error){
            console.error('Error:', error);
        }
    }

    static async logUser(req, res){
        try{
            const email = req.body.email;
            const password = req.body.password;
        }catch(error){
            console.error('Error:', error);
        }
    }
}

module.exports = UserController;