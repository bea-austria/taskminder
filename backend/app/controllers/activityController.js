const model = require('../models/activityModel');
class ActivityController {

    static async addEntry(id){
        try{
            await model.addEntry(id);
        }catch(error){
            console.error(error, 'Unable to add daily entry for this user');
        }
    }

    static async getDailyActivity(req, res, id){
        try{
            const activity = await model.getDailyActivity(id);
            res.status(200).json({activity: activity[0].activity});
        }catch(error){
            console.error(error, 'Unable to retrieve tracked hours for this project.')
        }
    }
    
    static async saveActivity(req, res){
        try{
            const user_id = req.body.id;
            const activity = req.body.activity;
            await model.saveActivity(user_id, activity);
        }catch(error){
            console.error(error,'Unable to save tracked hours for this project.');
        }
    }
}

module.exports = ActivityController;