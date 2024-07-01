const activityController = require('../controllers/activityController');
const userController = require('../controllers/userController');
const projectController = require('../controllers/projectController');
const productivityController = require('../controllers/productivityController');
const nodemailer = require('nodemailer');
require('dotenv').config();

//Create a report at 11:59 pm daiy to be sent to the administrator with employee's productivity data
const createReport = async(id) => {
    const adminDetails = await userController.getUserById(1);
    const admin = adminDetails[0].first_name.charAt(0).toUpperCase() + adminDetails[0].first_name.slice(1) + ' ' + adminDetails[0].last_name.charAt(0).toUpperCase() + adminDetails[0].last_name.slice(1)
    const userDetails = await userController.getUserById(id);
    const user = userDetails[0].first_name.charAt(0).toUpperCase() + userDetails[0].first_name.slice(1) + ' ' + userDetails[0].last_name.charAt(0).toUpperCase() + userDetails[0].last_name.slice(1)
    const activity = await activityController.getDailyActivity(id);
    const projects = await projectController.getAllProjects(id);
    const projectDetails =  await Promise.all(projects.map(async(project)=>{
        const hoursData = await productivityController.getDailyHours(project.id);
        return {
            name: project.name,
            worked_hours: hoursData[0].worked_hours || '00:00:00'
        }
    }));
    const projectDetailsText = projectDetails.map(project => `Name: ${project.name}\nWorked Hours: ${project.worked_hours}`).join('\n');
    const screenshots = await activityController.getScreenShots(id);
    const attachments = screenshots.map((file) => ({
        filename: file.filePath,
        path: './app/screenshots/' + file.filePath
    }))
    const timeStamps = screenshots.map((file)=> file.time)
    const timeIn = timeStamps[0];
    const timeOut = timeStamps[timeStamps.length -1];

    const mailOptions = {
        from: process.env.EMAIL_ID,
        to: adminDetails[0].email,
        subject: `Daily Productivity Report - ${user}`,
        text: `
Date: ${new Date()}
Admin: ${admin}
Employee: ${user}
Time In: ${timeIn} 
Time Out: ${timeOut}
Activity Level: ${activity}%
Active Projects: 
${projectDetailsText}
`,
        attachments: attachments
    };

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

}

module.exports = createReport;