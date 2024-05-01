const controller = require('../controllers/projectController')
const getHours = async (project) => {
    const response = await controller.getHours(project);
    const timeString = response.worked_hours
    const timeArr = []

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