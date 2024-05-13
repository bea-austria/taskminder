const db = require('../config/db.config');

class productivityModel {

    static async addEntry(project_id){
        return new Promise((resolve, reject)=>{
            const query = 'INSERT INTO productivity (project_id, created_at, updated_at) VALUES(?, NOW(), NOW())';
            db.query(query, [project_id],(error, result)=>{
                if(error){
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        })
    }

    static async getHours(id, user_id){
        return new Promise((resolve, reject)=>{
            const query = 'SELECT worked_hours FROM projects WHERE id = ? && user_id = ?';
            db.query(query, [id, user_id], (error, result)=>{
                if(error){
                    reject(error);
                }else{
                    resolve(result);
                }
            });
        });
    };

    // static async saveHours(timer, project_id, user_id){
    //     return new Promise((resolve, reject)=>{
    //         const query = 'UPDATE projects SET worked_hours = ?, updated_at = NOW() WHERE id= ? && user_id = ?';
    //         db.query(query, [timer, project_id, user_id], (error, result)=>{
    //             if(error){
    //                 reject(error);
    //             }else{
    //                 resolve(true);
    //             }
    //         })
    //     })
    // };

    // static async getDailyHours(id){
    //     return new Promise((resolve, reject) =>{
    //         const query = 'SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(worked_hours))) as worked_hours FROM projects WHERE user_id = ? AND updated_at >= CURDATE() AND updated_at < CURDATE() + INTERVAL 1 DAY';
    //         db.query(query, [id], (error, result)=>{
    //             if(error){
    //                 reject(error);
    //             }else{
    //                 resolve(result);
    //             }
    //         })
    //     })
    // };

    // static async getWeeklyHours(id){
    //     return new Promise((resolve, reject) =>{
    //         const query = 'SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(worked_hours))) as worked_hours FROM projects WHERE user_id = ? AND week(created_at, 1) = week(now(), 1)';
    //         db.query(query, [id], (error, result)=>{
    //             if(error){
    //                 reject(error);
    //             }else{
    //                 resolve(result);
    //             }
    //         })
    //     })
    // }
};

module.exports = productivityModel;