const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.post('/api/addUser', async (req,res) => {
    await controller.addUser(req, res);
    res.sendStatus(200);
});

router.post('/api/logUser', async (req,res) => {
    await controller.logUser(req, res);
    res.sendStatus(200);
});
module.exports = router;