const model = require('../models/projectModel');
class projectController {
    static async addProject(req, res){
        const name = req.body.name;
        const user_id = req.body.user_id;
        const limit_hours = req.body.limit_hours;
        const category = req.body.category;
        const description = req.body.description;
        const projects = await model.getProjects();
        
        const duplicate = projects.find((project)=> project.name === name && project.user_id == user_id)
        if(duplicate){
            return res.status(400).json({ error: "Duplicate project found" });
        }else{
            await model.addProject(user_id, name, limit_hours, category, description);
            return res.sendStatus(200);
        }
    }

    static async getProjects(req, res, index){
        try{
            console.log(index);
            const response = await model.getProjects(index);
            return response;
        }catch(error){
            throw new Error("Unable to load projects.")
        }
    }

    static async deleteProject(req, res, index){
        try{
            await model.deleteProject(index);
            res.sendStatus(200);
        }catch(error){
            res.sendStatus(500);
        }
    }

    static async editProject(req, res){
        const name = req.body.name;
        const limit_hours = req.body.limit_hours;
        const category = req.body.category;
        const description = req.body.description;
        const index = req.body.id;
        const projects = await model.getProjects();

        const duplicate = projects.find((project)=> project.name === name && project.id !== index);
        if(duplicate){
            return res.status(400).json({ error: "Duplicate project found" });
        }else{
            await model.editProject(name, limit_hours, category, description, index);
            return res.sendStatus(200);
        }
    }

    static async getHours(project){
        try{
            return await model.getHours(project.id);
        }catch(error){
            console.error('Unable to retrieved tracked hours for this project.');
        }
    }
    
}

module.exports = projectController;