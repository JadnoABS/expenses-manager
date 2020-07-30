const connection = require('../database/connection'),
    crypto = require('crypto');
const { update } = require('../database/connection');

module.exports = {
    async index(req, res) {
        const id = req.headers.authorization;

        const [userInfo] = await connection('users')
            .where('id', id)
            .select('*');
        
        return res.json(userInfo);
    },

    async create(req, res) {
        const { name, email, revenue } = req.body;
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('users').insert({
            id,
            name,
            email,
            revenue
        });

        return res.json({ id });
    },

    async update(req, res) {
        const { name, email } = req.body;
        const id = req.headers.authorization;

        const userInfo = await connection('users')
            .where('id', id)
            .update({
                name,
                email
            }, [name, email]);

        return res.json(userInfo);
    },

    async delete(req, res) {
        const id = req.headers.authorization;

        const user = await connection('users')
            .where('id', id)
            .delete();

        return res.status(204).send();
    },

    async updateRevenue(req, res) {
        const id = req.headers.authorization;
        const newRevenue = req.body.revenue;

        const revenue = await connection('users')
            .where('id', id)
            .update({
                revenue: newRevenue
            });

        return res.json(newRevenue);
    }
}