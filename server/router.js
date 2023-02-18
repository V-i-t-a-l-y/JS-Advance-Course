'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');
const handler = require('./handler');

router.get('/', (req, res) => {
    fs.readFile('server/jf/cart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            res.send(data);
        }
    })
});

router.put('/:id', (req, res) => {
       handler(req, res, 'change', 'server/jf/cart.json')
   });

router.post('/', (req, res) => {
       handler(req, res, 'add', 'server/jf/cart.json')
   });

router.delete('/:id', (req, res) => {
     handler(req, res, 'remove', 'server/jf/cart.json')
 })


module.exports = router;