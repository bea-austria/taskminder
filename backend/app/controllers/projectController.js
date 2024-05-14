const model = require('../models/projectModel');
const productivityController = require('../controllers/productivityController');
const check = require("express-validator");
const { validationResult } = check;

class projectController {
    static async addProject(req, res){
        const name = req.body.name;
        const user_id = req.body.user_id;
        const limit_hours = req.body.limit_hours;
        const category = req.body.category;
        const description = req.body.description;
        const projects = await model.getProjects(user_id);
        const duplicate = projects.find((project)=> project.name === name && project.user_id == user_id);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() });
        }
        
        if(duplicate){
            return res.status(400).json({ error: "Duplicate project found" });
        }

        const project_id = await model.addProject(user_id, name, limit_hours, category, description);
        await productivityController.addEntry(req, res, project_id);
        res.sendStatus(200);
    }

    static async getUserProjects(req, res, index){
        try{
            const projects = await model.getProjects(index);
            res.status(200).json(projects);
        }catch(error){
            res.json({ error: "Unable to retrieve projects at the moment." });
        }
    }

    static async getAllProjects(){
        try{
            return await model.getProjects(null);
        }catch(error){
            throw error;
        }
    }

    static async deleteProject(req, res, index){
        try{
            await model.deleteProject(index);
            res.sendStatus(200);
        }catch(error){
            res.json({ error: "Unable to delete project at the moment." });
        }
    }

    static async editProject(req, res){
        try{
            const name = req.body.name;
            const limit_hours = req.body.limit_hours;
            const category = req.body.category;
            const description = req.body.description;
            const index = req.body.id;
            const user_id = req.body.user_id;
            const projects = await model.getProjects(user_id);
            const duplicate = projects.find((project)=> project.name === name && project.id !== index);
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.json({ errors: errors.array() });
            }

            if(duplicate){
                return res.json({ error: "Duplicate project found" });
            }

            await model.editProject(name, limit_hours, category, description, index);
        }catch(error){
            res.json({ errors: "Unable to edit project details"});
        }
    }

}

module.exports = projectController;