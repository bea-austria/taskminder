const controller = require('../controllers/activityController');
const userController = require('../controllers/userController');

const createActivityEntry = async() => {
    try {
        const users = await userController.getUsers();
        for (const user of users) {
            console.log(user.id)
            await controller.addEntry(user.id);
        }
    } catch (error) {
        console.error('Error creating activity entry:', error);
    }
};

module.exports = createActivityEntry;
