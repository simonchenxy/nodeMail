const express = require('express');
const app = express();

const port = 3000;
const bodyParser = require('body-parser');
const recive = require('./src/routes/mail')
app
    .use((req, res, next) => {
        next();
    })
    .use(bodyParser.json())

    .use('/recive', recive)


    .listen(port, () => {
        console.log(`open http://localhost:${port}`)
    })