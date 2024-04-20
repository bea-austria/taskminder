const express = require('express');
const { body, validationResult } = require("express-validator");
const router = express.Router();
const controller = require('../controllers/userController');

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
        res.sendStatus(200);
});

router.post('/api/logUser', async (req,res) => {
    await controller.logUser(req, res);
    res.sendStatus(200);
});

module.exports = router;