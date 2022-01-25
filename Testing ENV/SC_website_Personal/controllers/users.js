const express = require('express');
const router = express.Router();
const CryptoJS = require("crypto-js");

const users = require('../models/users');
const contentChecker = require('../middlewares/content-checker');

router.get('/', (req, res) => {
    users.findAll((err, results) => {
        if (err) return res.status(500).send({ message: 'an error had occurred' });
        res.status(200).send(results);
    });
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    users.findById(id, (err, result) => {
        if (err) return res.status(500).send({ message: 'an error had occurred' });
        if (!result) return res.status(404).send({ message: 'no user found' });
        res.status(200).send(result);
    });
});
//Registration Endpoint
router.post('/', contentChecker([ 'username', 'password', 'firstname', 'lastname', 'email' ]), (req, res) => {
    let user = req.body;
    console.log(req.body.password)
    var hash = CryptoJS.SHA256(req.body.password).toString();
    user.password = hash;
    users.insert(user, (err, result) => {
        if (err) return res.status(500).send({ message: 'an error had occurred' });
        res.status(201).send(result);
    })
});

router.put('/:id', contentChecker([ 'username', 'password', 'firstname', 'lastname', 'email' ]), (req, res) => {
    let user = req.body;
    user.id = req.params.id;
    users.update(user, (err, result) => {
        if (err) return res.status(500).send({ message: 'an error had occurred' });
        if (!result) return res.status(400).send({ message: 'no user found' });
        res.status(200).send(result);
    })
});

module.exports = router;