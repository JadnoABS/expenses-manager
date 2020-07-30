require('dotenv').config();
const express = require('express'),
    axios = require('axios'),
    app = express();

const port = process.env.PORT || 3000;

app.use(express.static('public'));

const api = axios.create({
    baseURL: "http://localhost:3333",
    timeout: 5000
});

app.post('/session', async (req, res) => {
    try {
        const data = req.body.id;
        const response = await api.post('session', data);
        return res.send(response.data);
    } catch(err) {
        console.log(err);
    }
});

app.post('/register', async (req, res) => {
    try {
        const data = req.body.data;
        const response = await api.post('register', data);
        return res.send(response.data);
    } catch(err) {
        console.log(err);
    }
});

app.get('/profile', async (req, res) => {
    try {
        const id = req.headers.authorization;
        const response = await api.get('profile', {
            headers: {
                Authorization: id
            }
        });
        return res.json(response.data);
    } catch(err) {
        console.log(err);
    }
});

app.get('/expenses', async (req, res) => {
    try {
        const id = req.headers.authorization;
        const response = await api.get('expenses', {
            headers: {
                Authorization: id,
            }
        });
        return res.json(response.data);
    } catch(err) {
        console.log(err);
    }
})

app.use('/scripts', express.static(`${__dirname}/node_modules/`));
app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.listen(port, () => {
    console.log(`Frontend server is listening on port ${port}`);
})