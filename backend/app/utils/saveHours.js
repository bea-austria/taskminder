const controller = require('../controllers/productivityController')

const saveHours = async (timer, project_id) => {
    const formattedTimer = `${timer.hours}:${timer.minutes}:${timer.seconds}`;

    await controller.saveHours(formattedTimer, project_id);
};

module.exports = saveHours;