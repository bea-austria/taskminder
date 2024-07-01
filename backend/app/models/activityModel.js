const db = require('../config/db.config');

class ActivityModel {
    static async addEntry(id){
        return new Promise((resolve, reject)=>{
            const query = 'INSERT INTO activity_levels (user_id, activity, created_at, updated_at) VALUES(?, 0, NOW(), NOW())';
            db.query(query, [id],(error, result)=>{
                if(error){
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        })
    };

    static async getDailyActivity(index){
        return new Promise((resolve, reject)=>{
            const query = 
                `SELECT activity
                FROM activity_levels
                WHERE DATE(created_at) = CURDATE()
                AND user_id = ?;`;
            db.query(query, [index], (error, result)=>{
                if(error){
                    reject(error);
                }else{
                    resolve(result);
                }
            });
        })
    };
    
    static async saveActivity(user_id, activity){
        return new Promise((resolve, reject)=> {
            const query = 'UPDATE activity_levels SET activity =? , updated_at=NOW() WHERE user_id =? AND DATE(created_at) = CURDATE()';
            db.query(query, [activity, user_id],(error, result)=>{
                if(error){
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        })
    };

    static async saveScreenShot(id, filePath, time){
        return new Promise((resolve, reject)=> {
            const data = { filePath: filePath, time: time };
            const query = 'UPDATE activity_levels SET images = JSON_ARRAY_APPEND(IFNULL(images, JSON_ARRAY()), "$", ?), updated_at=NOW() WHERE user_id =? AND DATE(created_at) = CURDATE()';
            db.query(query, [JSON.stringify(data), id],(error, result)=>{
                if(error){
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        })
    }

    static async getScreenShots(id){
        return new Promise((resolve, reject)=> {
            const query = 'SELECT images FROM activity_levels WHERE user_id =? AND DATE(created_at) = CURDATE()';
            db.query(query, [id],(error, result)=>{
                if(error){
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        })
    }

};

module.exports = ActivityModel;