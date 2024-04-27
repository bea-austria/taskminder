const model = require('../models/projectModel');
class projectController {
    static async addProject(req, res){
        const name = req.body.name;
        const target_hours = req.body.target_hours;
        const category = req.body.category;
        const description = req.body.description;

        await model.addProject(name, target_hours, category, description);
    }

    static async getProjects(req, res){
        try{
            const response = await model.getProjects()
            return response;
        }catch(error){
            res.status(500);
        }
    }

    static async deleteProject(index){
        try{
            await model.deleteProject(index);
        }catch(error){
            res.status(500);
        }
    }
}

module.exports = projectController;