const model = require('../models/projectModel');
class projectController {
    static async addProject(req, res){
        const name = req.body.name;
        const limit_hours = req.body.limit_hours;
        const category = req.body.category;
        const description = req.body.description;
        const projects = await model.getProjects();
        
        const duplicate = projects.find((project)=> project.name === name)
        if(duplicate){
            throw new Error('Duplicate project name');
        }else{
            await model.addProject(name, limit_hours, category, description);
            return res.sendStatus(200);
        }
    }

    static async getProjects(req, res){
        try{
            const response = await model.getProjects()
            return response;
        }catch(error){
            res.status(500);
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
            throw new Error('Duplicate project name');
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