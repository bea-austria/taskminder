const db = require('../config/db.config');

class projectModel {
    static async addProject(user_id, name, limit_hours, category, description){
        return new Promise((resolve, reject)=>{
            const query = 'INSERT INTO projects (user_id, name, limit_hours, category, description, created_at, updated_at) VALUES(?,?,?,?,?, NOW(), NOW())';
            db.query(query, [user_id, name, limit_hours, category, description],(error, result)=>{
                if(error){
                    reject(error);
                } else {
                    resolve(result.insertId);
                }
            });
        })
    };

    static async getProjects(index){
        return new Promise((resolve, reject)=>{
            let query;
            let values = [];
            
            if(index){
                query = 'SELECT * FROM projects WHERE user_id = ?';
                values.push(index);
            }else{
                query = 'SELECT * FROM projects'
            }
            
            db.query(query, values, (error, result)=>{
                if(error){
                    reject(error);
                }else{
                    resolve(result);
                }
            });
        })
    };
    
    static async editProject(name, limit_hours, category, description, index){
        return new Promise((resolve, reject)=> {
            const query = 'UPDATE projects SET name=?, limit_hours=?, category=?, description=?, updated_at=NOW() WHERE id =?';
            db.query(query, [name, limit_hours, category, description, index],(error, result)=>{
                if(error){
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        })
    };

    static async deleteProject(index){
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM projects WHERE id = ?';
            db.query(query, [index], (error, result)=>{
                if(error){
                    reject(error);
                }else{
                    resolve(true);
                }
            })
        })
    };
};

module.exports = projectModel;