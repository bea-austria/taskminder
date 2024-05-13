const model = require('../models/productivityModel');
class productivityController {

    static async addEntry(req, res, project_id){
        try{
            await model.addEntry(project_id);
            res.sendStatus(200);
        }catch(error){
            // throw new Error('Unable to add daily entry for this project');
        }
    }

    static async getHours(project_id, user_id){
        try{
            return await model.getHours(project_id);
        }catch(error){
            throw new Error('Unable to retrieve tracked hours for this project.');
        }
    }
    
    // static async saveHours(timer, project_id, user_id){
    //     try{
    //         return await model.saveHours(timer, project_id, user_id);
    //     }catch(error){
    //         throw new Error('Unable to save tracked hours for this project.');
    //     }
    // }

    // static async getDailyHours(user_id){
    //     try{
    //         return await model.getDailyHours(user_id)
    //     }catch(error){
    //         throw new Error('Unable to retrieve total tracked hours for this user.')
    //     }
    // }

    // static async getWeeklyHours(user_id){
    //     try{
    //         return await model.getWeeklyHours(user_id)
    //     }catch(error){
    //         throw new Error('Unable to retrieve weekly tracked hours for this user.')
    //     }
    // }
}

module.exports = productivityController;