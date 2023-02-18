'use strict';

const fs = require('fs');
const cart = require('./cart');

const activity = {
    change: cart.change,
    add: cart.add,
    remove: cart.remove
}

const handler = (req, res, active, file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            const newFile = activity[active](JSON.parse(data), req);
            fs.writeFile(file, newFile, err => {
                if (err) {
                    res.sendStatus(404, JSON.stringify({result: 0, text: err}))
                } else {
                    res.send(JSON.stringify({result: 1}))
                }
            })
        }
    })
}



module.exports = handler;