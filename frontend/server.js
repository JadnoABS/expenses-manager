require('dotenv').config();
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    routes = require('./routes');

const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

app.use(routes);

app.use('/scripts', express.static(`${__dirname}/node_modules/`));
app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.listen(port, () => {
    console.log(`Frontend server is listening on port ${port}`);
})