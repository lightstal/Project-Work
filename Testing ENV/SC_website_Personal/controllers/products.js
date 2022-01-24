const express = require('express');
const router = express.Router();

const products = require('../models/products');
const contentChecker = require('../middlewares/content-checker');

router.get('/', (req, res) => {
    products.findAll((err, results) => {
        if (err) return res.status(500).send({ message: 'an error had occurred' });
        res.status(200).send(results);
    });
});

router.post('/search', (req, res) => {
    let search = req.body.search;
    if (!search) {
        search = '';
    }

    products.findMatching(search, (err, results) => {
        if(err){
            console.log(err);
        }
        if (err) return res.status(500).send({ message: 'an error had occurred' });
        res.status(200).send(results);
    });
})

router.get('/:id', (req, res) => {
    let id = req.params.id;
    products.findById(id, (err, result) => {
        if (err) return res.status(500).send({ message: 'an error had occurred' });
        if (!result) return res.status(404).send({ message: 'no product found' });
        res.status(200).send(result);
    });
});

router.post('/', contentChecker([ 'name', 'description', 'price', 'quantity' ]), (req, res) => {
    let product = req.body;
    products.insert(product, (err, result) => {
        if (err) return res.status(500).send({ message: 'an error had occurred' });
        res.status(201).send(result);
    })
});

router.put('/:id', contentChecker([ 'name', 'description', 'price', 'quantity' ]), (req, res) => {
    let product = req.body;
    product.id = req.params.id;
    products.update(product, (err, result) => {
        if (err) return res.status(500).send({ message: 'an error had occurred' });
        if (!result) return res.status(400).send({ message: 'no product found' });
        res.status(200).send(result);
    })
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    products.delete(id, (err, result) => {
        if (err) return res.status(500).send({ message: 'an error had occurred' });
        if (!result) return res.status(400).send({ message: 'no product found' });
        res.status(200).send(result);
    })
})

module.exports = router;