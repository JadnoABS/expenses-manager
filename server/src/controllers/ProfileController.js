const connection = require('../database/connection'),
    crypto = require('crypto');

module.exports = {
    async index(req, res) {
        const id = req.headers.authorization;

        const [userInfo] = await connection('users')
            .where('id', id)
            .select('*');
        
        return res.json(userInfo);
    },

    async create(req, res) {
        const { name, email, password, revenue } = req.body;
        const id = crypto.randomBytes(4).toString('HEX');

        const [existingEmail] = await connection('users')
            .where('email', email)
            .select('email');

        if(existingEmail){
            return res.status(400).json({
                error: "An account with this email already exists!",
            })
        }

        await connection('users').insert({
            id,
            name,
            email,
            password,
            revenue
        });

        return res.json({ id });
    },

    async update(req, res) {
        const { name } = req.body;
        const id = req.headers.authorization;

        const [userInfo] = await connection('users')
            .where({ id })
            .update({
                name
            }, ['name']);

        return res.json(userInfo);
    },

    async delete(req, res) {
        const id = req.headers.authorization;

        const user = await connection('users')
            .where('id', id)
            .delete();

        return res.status(204).send();
    },

    async updatePass(req, res) {
        const id = req.headers.authorization;
        const { password, newPassword } = req.body;

        const [data] = await connection('users')
            .where('id', id)
            .select('password');

        if(password !== data.password){
            return res.status(400).json({
                error: "Wrong password!"
            })
        };

        const response = await connection('users')
            .where('id', id)
            .update({
              password: newPassword
            });

        return res.json(response);
    },

    async updateRevenue(req, res) {
        const id = req.headers.authorization;
        const { revenue } = req.body;

        const [dbResponse] = await connection('users')
            .where('id', id)
            .update({
                revenue
            }, ['revenue']);

        return res.json(dbResponse);
    }
}
