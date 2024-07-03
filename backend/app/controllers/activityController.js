const model = require('../models/activityModel');
const path = require('path');
const fs = require('fs');
class ActivityController {

    static async addEntry(id){
        try{
            await model.addEntry(id);
        }catch(error){
            console.error(error, 'Unable to add daily entry for this user');
        }
    }

    static async getDailyActivity(id){
        try{
            const activity = await model.getDailyActivity(id);
            if(activity.length>0){
                return activity[0].activity;
            }else{
                return 0;
            }
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

    static async saveScreenShot(req, res, id){
        try{
            const { screenshot, fileName, time } = req.body;
            const imgBuffer = Buffer.from(screenshot, 'base64');
            const directory = path.join(__dirname, '../screenshots');

            if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory, { recursive: true });
            }

            const filePath = path.join(directory, fileName);

            fs.writeFileSync(filePath, imgBuffer);
            await model.saveScreenShot(id, filePath, time);
            res.sendStatus(200);
        }catch(error){
            console.error(error, 'Unable to save screen capture at this time.')
        }
    }
    
    static async getScreenShots(id){
        try{
            const response = await model.getScreenShots(id)
            if(response && response.length > 0 && response[0].images ){
                const imageUrls = JSON.parse(response[0].images).map(file => {
                const parsedFile = JSON.parse(file);
                return {filePath: path.basename(parsedFile.filePath), time:parsedFile.time};
                });
                return imageUrls;
            }else{
                return {};
            }
        }catch(error){
            console.error(error, 'Unable to fetch screen captures at this time.')
        }
    }
}

module.exports = ActivityController;