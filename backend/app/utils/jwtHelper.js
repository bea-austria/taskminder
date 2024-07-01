const jwt = require('jsonwebtoken');
require('dotenv').config();

//Generates and verifies user token for route access authentication
const generateToken = (id) => {
    return jwt.sign({ userId: id }, process.env.SECRET_KEY, { expiresIn: '30d' });
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY)
};

module.exports = {generateToken, verifyToken};