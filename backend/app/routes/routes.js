const express = require('express');
const { body, validationResult } = require("express-validator");
const router = express.Router();
const userController = require('../controllers/userController');
const projectController = require('../controllers/projectController');
const productivityController = require('../controllers/productivityController');

router.get('/api/checkLoggedIn', (req, res) => {
    res.status(200).json({ user: req.session.user || null });
});

router.post('/api/addUser',[
    body('firstName').notEmpty().trim(),
    body('lastName').notEmpty().trim(),
    body('email').isEmail().normalizeEmail().trim(),
    body('password').isLength({ min: 8 }).trim()
    ],
    userController.addUser
);

router.post('/api/logUser',[
    body('email').isEmail().normalizeEmail().trim(),
    body('password').isLength({ min: 8 }).trim()
    ],
    userController.logUser
);

router.get('/api/logOff', userController.logOff);

router.post('/api/newProject',[
    body('name').notEmpty().trim(),
    body('category').notEmpty().trim(),
    body('limit_hours').optional().isInt({ min: 0, max: 8 }),
    body('description').isLength({ min: 10}).trim()
    ],
    projectController.addProject
);

router.post('/api/editProject', [
    body('name').notEmpty().trim(),
    body('category').notEmpty().trim(),
    body('limit_hours').optional().isInt({ min: 0, max: 8 }),
    body('description').isLength({ min: 10}).trim()
    ]
    ,
    projectController.editProject
);

router.get('/api/getProjects/:id', async (req, res)=> {
    const index = parseInt(req.params.id);
    projectController.getUserProjects(req, res, index);
});

router.delete('/api/deleteProject/:id', async (req, res) =>{
    const index = parseInt(req.params.id);
    projectController.deleteProject(req, res, index);
});

// router.get('/api/getDailyHours/:id', async(req, res)=> {
//     try{
//         const id = parseInt(req.params.id);
//         const response = await projectController.getDailyHours(id);
//         res.status(200).json(response)
//     }catch(error){
//         res.status(400).json({ error: error.message });
//     }
// });

// router.get('/api/getWeeklyHours/:id', async(req, res)=> {
//     try{
//         const id = parseInt(req.params.id);
//         const response = await projectController.getWeeklyHours(id);
//         res.status(200).json(response)
//     }catch(error){
//         res.status(400).json({ error: error.message });
//     }
// });

module.exports = router;