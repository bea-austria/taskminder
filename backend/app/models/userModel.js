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
            });
        });
    };

    static async getHours(id){
        return new Promise((resolve, reject)=>{
            const query = 'SELECT worked_hours FROM users WHERE id = ?';
            db.query(query, [id], (error, result)=>{
                if(error){
                    reject(error);
                }else{
                    resolve(result);
                }
            });
        });
    };

    static async saveHours(timer, id){
        return new Promise((resolve, reject)=>{
            const query = 'UPDATE users SET worked_hours = ? WHERE id = ?';
            db.query(query, [timer, id], (error, result)=>{
                if(error){
                    reject(error);
                }else{
                    resolve(true);
                }
            });
        });
    };
};


module.exports = UserModel;