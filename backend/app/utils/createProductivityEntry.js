const controller = require('../controllers/productivityController');
const projectController = require('../controllers/projectController');

//create daily entries to track worked hours for each active project of each user
const createProductivityEntry = async() => {
    try {
        const projects = await projectController.getAllProjects();
        for (const project of projects) {
            await controller.addEntry(project.id, project.user_id);
        }
    } catch (error) {
        console.error('Error creating entry:', error);
    }
};

module.exports = createProductivityEntry;
