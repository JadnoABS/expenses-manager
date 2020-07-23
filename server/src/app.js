const express = require('express'),
    app = express(),
    cors = require('cors'),
    routes = require('./routes');

app.use(cors())
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
    console.log('Server running!');
});