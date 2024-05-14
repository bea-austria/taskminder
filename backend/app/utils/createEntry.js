const cron = require('node-cron');
const controller = require('../controllers/productivityController');
const projectController = require('../controllers/projectController');

const createEntry = async() => {
    try {
        const projects = await projectController.getAllProjects();
        console.log(projects)
        for (const project of projects) {
            console.log(project.id)
            await controller.addEntry(project.id);
        }
    } catch (error) {
        console.error('Error creating entry:', error);
    }
};

cron.schedule('0 11 * * *', createEntry);
