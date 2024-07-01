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

    static async getUserById(id){
        return new Promise((resolve, reject)=>{
            const query = 'SELECT * FROM users WHERE id = ?';
            db.query(query, [id], (error, result)=>{
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

    static async getUsers(){
        return new Promise((resolve, reject)=>{
            const query = 'SELECT * FROM users';
            db.query(query, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async storeUserCookie(id, token){
        return new Promise((resolve, reject)=>{
            const query = 'UPDATE users SET cookie=?, updated_at = NOW() WHERE id =?';
            db.query(query, [token, id], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
    }

    static async getUserCookie(id){
        return new Promise((resolve, reject)=>{
            const query = 'SELECT cookie FROM users WHERE id =?';
            db.query(query, [id], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async storeUserPWToken(token, email){
        return new Promise((resolve, reject)=>{
            const query = 'UPDATE users SET pw_reset_token = ?, updated_at = NOW() WHERE email =?';
            db.query(query, [token, email], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
    }

    static async checkTokenExpiration(id){
        return new Promise((resolve, reject)=>{
            const query = 'SELECT * FROM users WHERE id=? AND updated_at >= DATE_SUB(NOW(), INTERVAL 10 MINUTE)';
            db.query(query, [id], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async changePassword(password, id){
        return new Promise((resolve, reject)=>{
            const query = 'UPDATE users SET password = ?, updated_at = NOW() WHERE id=?';
            db.query(query, [password, id], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
    }
};


module.exports = UserModel;