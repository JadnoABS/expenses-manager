require('dotenv').config();
const express = require('express'),
    bodyParser = require('body-parser'),
    router = require('./routes');

const app = express(),
    port = +process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

app.use(router);

app.use('/scripts', express.static(`${__dirname}/node_modules/`));
app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.listen(port, () => {
    console.log(`Frontend server is listening on port ${port}`);
})