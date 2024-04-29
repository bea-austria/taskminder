const db = require('../config/db.config');

class projectModel {
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
    }
    
    static async editProject(name, target_hours, category, description, index){
        console.log('hello')
        return new Promise((resolve, reject)=> {
            const query = 'UPDATE projects SET name=?, target_hours=?, category=?, description=?, updated_at=NOW() WHERE id =?';
            db.query(query, [name, target_hours, category, description, index],(error, result)=>{
                if(error){
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        })
    }

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
    }
}

module.exports = projectModel;