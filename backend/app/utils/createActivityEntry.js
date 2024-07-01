const controller = require('../controllers/activityController');
const userController = require('../controllers/userController');

//create daily activity entry for all active projects per user
const createActivityEntry = async() => {
    try {
        const users = await userController.getUsers();
        for (const user of users) {
            await controller.addEntry(user.id);
        }
    } catch (error) {
        console.error('Error creating activity entry:', error);
    }
};

module.exports = createActivityEntry;
