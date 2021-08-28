const express = require('express'),
    app = express(),
    cors = require('cors'),
    routes = require('./routes');

app.use(cors())
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3333;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
