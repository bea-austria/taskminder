const db = require('../config/db.config');

class projectModel {
    static async addProject(name, limit_hours, category, description){
        return new Promise((resolve, reject)=>{
            const query = 'INSERT INTO projects (name, limit_hours, category, description, created_at, updated_at) VALUES(?,?,?,?, NOW(), NOW())';
            db.query(query, [name, limit_hours, category, description],(error, result)=>{
                if(error){
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        })
    };

    static async getProjects(){
        return new Promise((resolve, reject)=>{
            const query = 'SELECT * FROM projects';
            db.query(query, (error, result)=>{
                if(error){
                    reject(error);
                } else {
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

    static async getHours(id){
        return new Promise((resolve, reject)=>{
            const query = 'SELECT worked_hours FROM projects WHERE id = ?';
            db.query(query, [id], (error, result)=>{
                if(error){
                    reject(error);
                }else{
                    resolve(result);
                }
            });
        });
    };
}

module.exports = projectModel;