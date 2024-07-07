const controller = require('../controllers/productivityController')

//Saves formatted tracked hours upon pause
const saveHours = async (id, timer, project_id) => {
    let formattedTimer
    if(timer){
        formattedTimer = `${timer.hours}:${timer.minutes}:${timer.seconds}`;
    }
    await controller.saveHours(id, formattedTimer, project_id);
};

module.exports = saveHours;