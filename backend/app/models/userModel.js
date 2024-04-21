const db = require('../config/db.config');

class UserModel{

    static async fetchUser(email){
        return new Promise((resolve, reject)=>{
            const query = 'SELECT * FROM users WHERE email = ?';
            db.query(query, [email], (error, result)=>{
                if(error){
                    reject(error);
                }else{
                    resolve(result);
                }
            })
        })
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

    static async addProject(name, target_hours, category, description){
        return new Promise((resolve, reject)=>{
            const query = 'INSERT INTO projects (name, target_hours, category, description, created_at, updated_at) VALUES(?,?,?,?, NOW(), NOW())';
            db.query(query, [name, target_hours, category, description],(error, result)=>{
                if(error){
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        })
    }
};


module.exports = UserModel;