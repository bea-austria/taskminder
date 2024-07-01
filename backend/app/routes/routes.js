const express = require('express');
const { body } = require("express-validator");
const router = express.Router();
const userController = require('../controllers/userController');
const projectController = require('../controllers/projectController');
const productivityController = require('../controllers/productivityController');
const activityController = require('../controllers/activityController');
const authenticate = require('../middleware/authenticateToken');
const cron = require('node-cron');
const createReport = require('../utils/createReport');

router.get('/api/isAuthenticated',authenticate, (req,res)=>{
    res.status(200).json({ user: req.user[0] });
})
router.post('/api/addUser',[
    body('firstName').notEmpty().trim(),
    body('lastName').notEmpty().trim(),
    body('email').isEmail().normalizeEmail().trim(),
    body('password').isLength({ min: 8 }).trim()
    ],
    userController.addUser
);

router.post('/api/logUser',
    [
    body('email').isEmail().normalizeEmail().trim(),
    body('password').isLength({ min: 8 }).trim()
    ],
    userController.logUser
);

router.get('/api/logOff', authenticate, userController.logOff);

router.post('/api/newProject', authenticate, [
    body('name').notEmpty().trim(),
    body('category').notEmpty().trim(),
    body('limit_hours').optional().isInt({ min: 0, max: 8 }),
    body('description').isLength({ min: 10}).trim()
    ],
    projectController.addProject
);

router.post('/api/editProject',authenticate, [
    body('name').notEmpty().trim(),
    body('category').notEmpty().trim(),
    body('limit_hours').optional().isInt({ min: 0, max: 8 }),
    body('description').isLength({ min: 10}).trim()
    ]
    ,
    projectController.editProject
);

router.get('/api/getProjects/:id', authenticate, async(req, res)=> {
    const index = parseInt(req.params.id);
    const projects = await projectController.getUserProjects(index);
    res.status(200).json(projects);
});

router.delete('/api/deleteProject/:id',authenticate, (req, res) =>{
    const index = parseInt(req.params.id);
    projectController.deleteProject(req, res, index);
});

router.get('/api/getActivity/:id',authenticate, async (req, res)=>{
    const index = parseInt(req.params.id);
    const response = await activityController.getDailyActivity(index);
    res.status(200).json({activity: response});
});

router.post('/api/setActivity',authenticate, activityController.saveActivity);

router.get('/api/getWeeklyHours/:id',authenticate, (req, res)=> {
    const id = parseInt(req.params.id);
    productivityController.getWeeklyHours(req, res, id);
});

router.get('/api/getWeeklyData/:id',authenticate, async(req, res)=> {
    const id = parseInt(req.params.id);
    await productivityController.getWeeklyData(req, res, id);
});

router.post('/api/uploadScreenshot/:id',authenticate,async(req, res)=> {
    const id = parseInt(req.params.id);
    await activityController.saveScreenShot(req, res, id);
});

router.get('/api/getScreenShots/:id',authenticate, async(req, res)=> {
    const id = parseInt(req.params.id);
    const response = await activityController.getScreenShots(id)
    res.status(200).json(response);
});

router.get('/api/getMembers', authenticate, async(req, res) => {
    const response = await userController.getUsers();
    res.status(200).json(response);
});

router.get('/api/scheduleReport/:id',authenticate, async(req, res)=> {
    const id = parseInt(req.params.id);
    cron.schedule('59 23 * * *', () => {
        createReport(id);
    });
});

router.post(`/api/forgotPassword/`, [
    body('email').isEmail().normalizeEmail().trim()],
    userController.forgotPassword
)

router.post('/api/verifyToken', userController.verifyTokenValidity);

router.post(`/api/resetPassword/`, [
    body('email').isEmail().normalizeEmail().trim(),
    body('password').isLength({ min: 8 }).trim()],
    userController.resetPassword
)

module.exports = router;