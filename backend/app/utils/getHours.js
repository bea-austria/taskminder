const projectController = require('../controllers/projectController')
const userController = require('../controllers/userController');

const getHours = async (project_id, user_id) => {
    let response;
    let type;

    if(project_id){
        response = await projectController.getHours(project_id, user_id);
        type = 'project'
    }else{
        response = await userController.getHours(user_id);
        type = 'user'
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