class userController{

    static async addUser(req, res){
        try{
            const user = {email: req.body.email, password: req.body.password}
            console.log('im connected to addUser controller');
        }catch(error){
            console.error('Error:', error);
        }
    }

    static async logUser(req, res){
        try{
            const user = req.body;
            console.log('im connected to logUser controller');
        }catch(error){
            console.error('Error:', error);
        }
    }
}

module.exports = userController;