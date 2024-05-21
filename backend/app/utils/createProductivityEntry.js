const controller = require('../controllers/productivityController');
const projectController = require('../controllers/projectController');

const createProductivityEntry = async() => {
    try {
        const projects = await projectController.getAllProjects();
        for (const project of projects) {
            console.log(project.id)
            await controller.addEntry(project.id);
        }
    } catch (error) {
        console.error('Error creating entry:', error);
    }
};

module.exports = createProductivityEntry;
