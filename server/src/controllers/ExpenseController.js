const connection = require('../database/connection');
const { update } = require('../database/connection');

module.exports = {
    async index(req, res) {
        const user_id = req.headers.authorization;

        const expenses = await connection('expenses')
            .where('user_id', user_id)
            .select('*');

        return res.json(expenses);
    },

    async create(req, res) {
        const user_id = req.headers.authorization;
        const { title, description, value } = req.body;

        const [expensesData] = await connection('expenses')
            .insert({
                title,
                description,
                value,
                user_id
            }, ['title', 'description', 'value']);

        return res.json(expensesData);
    },

    async update(req, res) {
        const user_id = req.headers.authorization,
            id = req.params.id,
            newTitle = req.body.title,
            newDescription = req.body.description,
            newValue = req.body.value;

        const expense = await connection('expenses')
            .where('id', id)
            .select('user_id')
            .first();

        if(expense.user_id !== user_id){
            return res.status(401).json({
                error: "Operation not permitted!"
            });
        };

        await connection('expenses').where('id', id)
            .update({
                title: newTitle,
                description: newDescription,
                value: newValue
            });

        return res.json(expense);
    },

    async delete(req, res) {
        const user_id = req.headers.authorization;
        const id = req.params.id;

        const expense = await connection('expenses')
            .where('id', id)
            .select('user_id')
            .first();

        if(expense.user_id !== user_id){
            return res.status(401).json({
                error: "Operation not permitted!"
            });
        };

        await connection('expenses').where('id', id).delete();

        return res.status(204).send();
    }
}
