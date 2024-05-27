const model = require('../models/productivityModel');
class productivityController {

    static async addEntry(project_id){
        try{
            await model.addEntry(project_id);
        }catch(error){
            console.error(error, 'Unable to add daily entry to this project');
        }
    }

    static async getDailyHours(project_id){
        try{
            return await model.getDailyHours(project_id);
        }catch(error){
            console.error(error, 'Unable to retrieve tracked hours for this project.')
        }
    }
    
    static async saveHours(timer, project_id){
        try{
            await model.saveHours(timer, project_id);
        }catch(error){
            console.error(error,'Unable to save tracked hours for this project.');
        }
    }

    static async getWeeklyHours(req, res, user_id){
        try{
            const response = await model.getWeeklyHours(user_id);
            res.json(response[0]);
        }catch(error){
            console.error(error,'Unable to retrieve weekly tracked hours for this user.')
        }
    }

    static async getWeeklyData(req, res, user_id){
        try{
            const response = await model.getWeeklyData(user_id);
            res.json(response);
        }catch(error){
            console.error(error,'Unable to retrieve weekly data for this user.')
        }
    }
}

module.exports = productivityController;