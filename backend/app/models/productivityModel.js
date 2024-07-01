const db = require('../config/db.config');

class productivityModel {

    static async addEntry(project_id, user_id){
        return new Promise((resolve, reject)=>{
            const query = 'INSERT INTO productivity (user_id, project_id, created_at, updated_at) VALUES(?,?, NOW(), NOW())';
            db.query(query, [user_id, project_id],(error, result)=>{
                if(error){
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        })
    }

    static async getDailyHours(id){
        return new Promise((resolve, reject)=>{
            const query = 'SELECT worked_hours FROM productivity WHERE project_id = ? and DATE(created_at) = CURDATE()';
            db.query(query, [id], (error, result)=>{
                if(error){
                    reject(error);
                }else{
                    resolve(result);
                }
            });
        });
    };

    static async saveHours(timer, project_id){
        return new Promise((resolve, reject)=>{
            const query = 'UPDATE productivity SET worked_hours = ?, updated_at = NOW() WHERE project_id= ? AND DATE(created_at) = CURDATE()';
            db.query(query, [timer, project_id], (error, result)=>{
                if(error){
                    reject(error);
                }else{
                    resolve(true);
                };
            });
        });
    };

    static async getWeeklyHours(id){
        return new Promise((resolve, reject) =>{
            const query = `
                SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(productivity.worked_hours))) as worked_hours 
                FROM productivity 
                WHERE week(productivity.created_at, 1) = week(now(), 1)
                AND productivity.user_id = ?`;
            db.query(query, [id], (error, result)=>{
                if(error){
                    reject(error);
                }else{
                    resolve(result);
                };
            });
        });
    };

    static async getWeeklyData(id){
        return new Promise((resolve, reject) =>{
            const query = `
            SELECT 
            DATE_FORMAT(p.created_at, '%a') AS day,
            SEC_TO_TIME(SUM(TIME_TO_SEC(p.worked_hours))) AS total_hours,
                (SELECT a.activity 
                FROM activity_levels a 
                WHERE a.user_id = p.user_id 
                AND WEEK(a.created_at, 1) = WEEK(CURDATE(), 1)
                AND DATE_FORMAT(a.created_at, '%a') = DATE_FORMAT(p.created_at, '%a')
                LIMIT 1) AS activity
            FROM productivity p
            WHERE p.user_id = ?
            AND WEEK(p.created_at, 1) = WEEK(CURDATE(), 1)
            GROUP BY day, activity
            ORDER BY FIELD(day, 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun');`
            db.query(query, [id], (error, result)=>{
                if(error){
                    reject(error);
                }else{
                    resolve(result);
                };
            });
        })
    };
};

module.exports = productivityModel;