const projectController = require('../controllers/projectController')
const userController = require('../controllers/userController');

const saveHours = async (timer, project_id, user_id) => {
    const formattedTimer = `${timer.hours}:${timer.minutes}:${timer.seconds}`;

    if(project_id){
        await projectController.saveHours(formattedTimer, project_id, user_id);
    }else{
        await userController.saveHours(formattedTimer, user_id);
    }

    
};

module.exports = saveHours;