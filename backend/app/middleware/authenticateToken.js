const bcrypt = require('bcryptjs');
const userController = require('../controllers/userController');
const { verifyToken } = require('../utils/jwtHelper');

const authenticate = async(req, res, next) => {
    const token = req.cookies.loginToken;

    if(!token){
        return res.status(401).json({error: 'Please log in to your account'})
    };

    try{
        const decoded = verifyToken(token);
        const userId = decoded.userId;

        const storedCookie = await userController.getUserCookie(userId);
        
        if(storedCookie.length === 0){
            return res.status(401).json({error: 'Please log in to your account'})
        };

        const isTokenValid = await bcrypt.compare(token, storedCookie[0].cookie);

        if(!isTokenValid){
            return res.status(401).json({error: 'Please log in to your account'})
        }
        const user = await userController.getUserById(userId);
        req.user = user;
        next();
    }catch(err){
        console.error('Failed to authenticate user.')
    }
}

module.exports = authenticate;
