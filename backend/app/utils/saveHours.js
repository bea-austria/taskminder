const controller = require('../controllers/projectController')

const saveHours = async (timer, project_id, user_id) => {
    const formattedTimer = `${timer.hours}:${timer.minutes}:${timer.seconds}`;

    await controller.saveHours(formattedTimer, project_id, user_id);
};

module.exports = saveHours;