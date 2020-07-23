const connection = require('../database/connection'),
    nodemailer = require('nodemailer'),
    account = require('../../emailAccount');

module.exports = {
    async index(req, res) {
        const user_email = req.body.email;
        
        const {id} = await connection('users')
        .where('email', user_email)
        .select('id')
        .first();

        if(!id){
            return res.status(400).json({
                error: "No user with this email, please create an account"
            });
        };

        const tranporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: account.user,
                pass: account.pass,
            },
        });

        const info = await tranporter.sendMail({
            from: `Expenses WebApp <${account.user}>`,
            to: user_email,
            subject: "Recuperação de ID do app contabilizador de despesas",
            text: `Recuperação de ID. Seu ID é:${id}`,
            html: `<h3>Recuperação de ID</h3><p>Seu ID é:</p><br><h2>${id}</h2><a href="localhost:3000">Voltar ao site</a>`
        }).then(message => {
            return res.json(message);
        }).catch(err => {
            console.log(err);
            return res.json(err);
        });
    }
}