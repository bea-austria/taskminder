const controller = require('../controllers/projectController')

const getHours = async (project_id, user_id) => {
    let response;

    if(project_id){
        response = await controller.getHours(project_id, user_id);
    }else{
        response = await controller.getDailyHours(user_id);
    }

    const timeString = response[0].worked_hours;
    let timeArr = []

    if(timeString){
        timeArr = timeString.split(':');
    }

    const savedHours = {
        hours: parseInt(timeArr[0]) || 0,
        minutes: parseInt(timeArr[1])|| 0,
        seconds: parseInt(timeArr[2]) || 0
    };

    return savedHours;
}

module.exports = getHours;