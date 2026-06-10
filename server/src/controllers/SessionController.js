const connection = require('../database/connection'),
    bcrypt = require('bcryptjs');

module.exports = {
  async create(req, res) {
    const {email, password} = req.body;

    const [credentials] = await connection('users')
        .where('email', email)
        .select('password', 'id');

    if(!credentials){
        return res.status(400).json({
            error: "No user found with this email!"
        });
    }

    const passwordMatch = await bcrypt.compare(password, credentials.password);
    if(!passwordMatch){
        return res.status(401).json({
            error: "Wrong password!"
        });
    }

    const [response] = await connection('users')
        .where('id', credentials.id)
        .select('id', 'name', 'email');

    return res.json(response);
  },
}
