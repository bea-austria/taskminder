const express = require('express');
const { body, validationResult } = require("express-validator");
const router = express.Router();
const controller = require('../controllers/userController');

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

        await controller.addUser(req, res);
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

        await controller.logUser(req, res);
});

router.get('/api/logOff', async (req, res)=>{
    await controller.logOff(req, res);
    res.sendStatus(200);
})

router.post('/api/newProject',[
    body('name').notEmpty().trim(),
    body('category').notEmpty().trim(),
    body('target_hours').notEmpty().trim(),
    body('description').isLength({ min: 10}).trim()
    ]
    ,async (req,res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        await controller.addProject(req, res);
    }
)

router.get('/api/getProjects', (req, res)=> {
    console.log('hello')
})

module.exports = router;