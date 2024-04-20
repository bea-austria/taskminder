const db = require('../config/db.config');

class UserModel{

    static validate(input){

    }

    static async addUser(first_name, last_name, email, password){        
        return new Promise((resolve, reject)=>{
            const query = 'INSERT INTO users (first_name, last_name, email, password, created_at, updated_at) VALUES(?,?,?,?, NOW(), NOW())';
            db.query(query, [first_name, last_name, email, password], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            })
        })
    }
};


module.exports = UserModel;