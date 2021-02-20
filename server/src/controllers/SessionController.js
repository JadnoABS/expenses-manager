const connection = require('../database/connection');

module.exports = {
    async create(req, res) {
        const {email, encryptedPass} = req.body;

        const [credentials] = await connection('users')
            .where('email', email)
            .select('password');
        
        if(!credentials){
            return res.status(400).json({
                error: "No user found with this email!"
            });
        }

        if(encryptedPass !== credentials.password){
            return res.status(401).json({
                error: "Wrong password!"
            });
        }

        const [response] = await connection('users')
            .where('password', encryptedPass)
            .select('id', 'name', 'email');

        return res.json(response);
    },
}