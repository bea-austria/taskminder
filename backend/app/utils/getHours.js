const controller = require('../controllers/productivityController');

const getHours = async (project_id) => {
    const response = await controller.getDailyHours(project_id);
    let timeString;

    if(response.length >0 ){
        timeString = response[0].worked_hours;
    }
    
    let timeArr = [];

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