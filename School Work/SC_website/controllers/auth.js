const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

const config = require('../config');
const users = require('../models/users');
const contentChecker = require('../middlewares/content-checker');

router.post('/login', contentChecker(['username', 'password']), (req, res) => {
    let { username, password } = req.body;

    users.verify(username, password, (err, result) => {
        if (err) return res.status(500).send({ message: 'an error had occurred' });
        if (!result) return res.status(401).send({ message: 'invalid user credentials' });

        let user = {
            id: result.id,
            username: result.username,
            firstname: result.firstname,
            lastname: result.lastname,
            role: result.role
        };
        jwt.sign(user, config.jwt.secret, (err, token) => {
            if (err) return res.status(500).send({ message: 'an error had occurred' });
            res.status(200).send({ user, token });
        })
    })
});

module.exports = router;