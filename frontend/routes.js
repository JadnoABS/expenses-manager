const express = require('express'),
    router = express.Router(),
    axios = require('axios');

const api = axios.create({
    baseURL: "http://localhost:3333",
    timeout: 5000
});

router.post('/session', async (req, res) => {
    try {
        const data = req.body;
        const response = await api.post('session', data);
        console.log(response);
        return res.send(response.data);
    } catch(err) {
        return res.status(401).json({
            error: err.response.data
        });
    }
});

router.post('/register', async (req, res) => {
    try {
        const data = req.body.data;
        const response = await api.post('register', data);
        return res.send(response.data);
    } catch(err) {
        return res.status(500).json({
            error: 'Server request error!'
        });
    }
});

router.get('/profile', async (req, res) => {
    try {
        const id = req.headers.authorization;
        const response = await api.get('profile', {
            headers: {
                Authorization: id
            }
        });
        return res.json(response.data);
    } catch(err) {
        console.log('Jadno voce nao sabe programar e bota a culpa na gnt');
        // return res.status(500).json({
        //     error: 'Server request error!'
        // });
    }
});

router.get('/expenses', async (req, res) => {
    try {
        const id = req.headers.authorization;
        const response = await api.get('expenses', {
            headers: {
                Authorization: id,
            }
        });
        return res.json(response.data);
    } catch(err) {
        return res.status(500).json({
            error: 'Server request error!'
        });
    }
});

router.post('/expenses', async (req, res) => {
    try {
        const id = req.headers.authorization;
        const expenseData = req.body;

        const {response} = await api.post('expenses', expenseData, {
            headers: {
                Authorization: id
            }
        });

        return res.json(response);
    } catch (err) {
        return res.status(500).json({
            error: 'Server request error!'
        });
    }
});

router.delete('/expenses/:id', async (req, res) => {
    try {
        const id = req.params.id,
            user_id = req.headers.authorization;

        const {response} = await api.delete(`expenses/${id}`, {
            headers: {
                Authorization: user_id,
            },
        });

        return res.json(response);
    } catch (err) {
        return res.status(500).json({
            error: 'Server request error!'
        });
    }
});

module.exports = router;