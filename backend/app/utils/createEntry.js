const cron = require('node-cron');
const controller = require('../controllers/productivityController');
const projectController = require('../controllers/projectController');

async function createEntry(){
    try {
        const projects = await projectController.getAllProjects();
        for (const project of projects) {
            await controller.addEntry(project.id);
        }
    } catch (error) {
        console.error('Error creating entry:', error);
    }
};

cron.schedule('0 0 * * *', createEntry);