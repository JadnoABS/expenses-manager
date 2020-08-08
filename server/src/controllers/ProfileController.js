const connection = require('../database/connection'),
    crypto = require('crypto'),
    bcrypt = require('bcrypt');

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

        const salt = await bcrypt.genSaltSync(10);
        const encryptedPass = await bcrypt.hashSync(password, salt);


        await connection('users').insert({
            id,
            name,
            email,
            password: encryptedPass,
            salt,
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

    async updatePass(req, res) {
        const id = req.headers.authorization;
        const { password, newPassword } = req.body;

        const [data] = await connection('users')
            .where('id', id)
            .select('password', 'salt');

        let encryptedInputPass = bcrypt.hashSync(password, data.salt);

        if(encryptedInputPass !== data.password){
            return res.status(400).json({
                error: "Wrong password!"
            })
        };

        let encryptedNewPass = await bcrypt.hashSync(newPassword, data.salt);

        const response = await connection('users')
            .where('id', id)
            .update({
                password: encryptedNewPass
            });

        return res.json(response);
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