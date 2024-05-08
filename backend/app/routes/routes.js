const express = require('express');
const { body, validationResult } = require("express-validator");
const router = express.Router();
const userController = require('../controllers/userController');
const projectController = require('../controllers/projectController');

router.get('/api/checkLoggedIn', (req, res) => {
    res.status(200).json({ user: req.session.user || null });
});

router.post('/api/addUser',[
    body('firstName').notEmpty().trim(),
    body('lastName').notEmpty().trim(),
    body('email').isEmail().normalizeEmail().trim(),
    body('password').isLength({ min: 8 }).trim()
    ]
    , async (req,res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        await userController.addUser(req, res);
});

router.post('/api/logUser',[
    body('email').isEmail().normalizeEmail().trim(),
    body('password').isLength({ min: 8 }).trim()
    ]
    ,async (req,res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        await userController.logUser(req, res);
});

router.get('/api/logOff', async (req, res)=>{
    await userController.logOff(req, res);
    res.sendStatus(200);
});

router.post('/api/newProject',[
    body('name').notEmpty().trim(),
    body('category').notEmpty().trim(),
    body('limit_hours').optional().isInt({ min: 0, max: 8 }),
    body('description').isLength({ min: 10}).trim()
    ]
    ,async (req,res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try{
            await projectController.addProject(req, res);
        }catch(error){
            res.json({ error: error.message });
        }
    }
);

router.post('/api/editProject', [
    body('name').notEmpty().trim(),
    body('category').notEmpty().trim(),
    body('limit_hours').optional().isInt({ min: 0, max: 8 }),
    body('description').isLength({ min: 10}).trim()
    ]
    ,async (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try{
            await projectController.editProject(req, res)
        }catch(error){
            res.json({ error: error.message });
        }
    }
);

router.get('/api/getProjects/:id', async (req, res)=> {
    try{
        const index = parseInt(req.params.id);
        const projects = await projectController.getProjects(req, res, index);
        res.status(200).json({projects: projects})
    }catch(error){
        res.status(400).json({ error: error.message });
    }
});

router.delete('/api/deleteProject/:id', async (req, res) =>{
    const index = parseInt(req.params.id);
    await projectController.deleteProject(req, res, index);
});

router.get('/api/getDailyHours/:id', async(req, res)=> {
    try{
        const id = parseInt(req.params.id);
        const response = await projectController.getDailyHours(id);
        res.status(200).json(response)
    }catch(error){
        res.status(400).json({ error: error.message });
    }
});

router.get('/api/getWeeklyHours/:id', async(req, res)=> {
    try{
        const id = parseInt(req.params.id);
        const response = await projectController.getWeeklyHours(id);
        res.status(200).json(response)
    }catch(error){
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;