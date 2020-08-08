const connection = require('../database/connection'),
    bcrypt = require('bcrypt');

module.exports = {
    async create(req, res) {
        const {name, password} = req.body;

        const [credentials] = await connection('users')
            .where('name', name)
            .select('password', 'salt');
        
        if(!credentials){
            return res.status(400).json({
                error: "No user found with this name!"
            });
        }

        let encryptedInputPassword = await bcrypt.hashSync(password, credentials.salt);

        if(encryptedInputPassword !== credentials.password){
            return res.status(401).json({
                error: "Wrong password!"
            });
        }

        const [id] = await connection('users')
            .where('password', encryptedInputPassword)
            .select('id');

        return res.json(id);
    },
}