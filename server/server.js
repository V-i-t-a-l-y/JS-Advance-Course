'use strict';

const express = require('express');
const fs = require('fs');
const app = express();
const cart = require('./router');

app.use('/', express.static('main'));
app.use(express.json());
app.use('/app_cart', cart);

app.get('/app_catalog', (req, res) => {
    fs.readFile('server/jf/products.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            res.send(data);
        }
    })
})

const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`Connect to port ${PORT}`);
})
