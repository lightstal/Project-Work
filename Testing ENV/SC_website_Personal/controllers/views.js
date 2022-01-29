const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile('index.html', { root: `${__dirname}/../public` });
});

router.get('/products', (req, res) => {
    res.sendFile('products.html', { root: `${__dirname}/../public` });
});

router.get('/products/**', (req, res) => {
    res.sendFile('item.html', { root: `${__dirname}/../public` });
});

router.get('/search**', (req, res) => {
    res.sendFile('search.html', { root: `${__dirname}/../public` });
});

router.get('/profile', (req, res) => {
    res.sendFile('profile.html', { root: `${__dirname}/../public` });
});

router.get('/login', (req, res) => {
    res.sendFile('login.html', { root: `${__dirname}/../public` });
});

router.get('/about', (req, res) => {
    res.sendFile('about.html', { root: `${__dirname}/../public` });
});

router.get('/admin', (req, res) => {
    res.sendFile('admin.html', { root: `${__dirname}/../public` });
});

router.get('/register', (req, res) => {
    res.sendFile('register.html', { root: `${__dirname}/../public` })
});

router.get('/feedback', (req, res) => {
    res.sendFile('feedback.html', { root: `${__dirname}/../public` })
});

module.exports = router;