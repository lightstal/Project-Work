const express = require('express');
const router = express.Router();

const comments = require('../models/comments');
const contentChecker = require('../middlewares/content-checker');

router.get('/', (req, res) => {
    comments.findAllAssociated((err, results) => {
        if (err) return res.status(500).send({ message: 'an error had occurred' });
        res.status(200).send(results);
    });
});

router.post('/', contentChecker([ 'userId', 'comment' ]), (req, res) => {
    let comment = req.body;
    comments.insert(comment, (err, result) => {
        if (err) return res.status(500).send({ message: 'an error had occurred' });
        res.status(201).send(result);
    })
});

module.exports = router;