const model = require('../models/projectModel');
class projectController {
    static async addProject(req, res){
        const name = req.body.name;
        const target_hours = req.body.target_hours;
        const category = req.body.category;
        const description = req.body.description;
        const projects = await model.getProjects();
        
        const duplicate = projects.find((project)=> project.name === name)
        if(duplicate){
            throw new Error('Duplicate project name');
        }else{
            await model.addProject(name, target_hours, category, description);
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
        const target_hours = req.body.target_hours;
        const category = req.body.category;
        const description = req.body.description;
        const index = req.body.id;
        const projects = await model.getProjects();

        const duplicate = projects.find((project)=> project.name === name && project.id !== index);
        if(duplicate){
            throw new Error('Duplicate project name');
        }else{
            await model.editProject(name, target_hours, category, description, index);
            return res.sendStatus(200);
        }
    }
    
}

module.exports = projectController;