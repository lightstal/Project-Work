const express = require('express');
const app = express();

// Content parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static content
app.use('/css', express.static('./public/css'));
app.use('/js', express.static('./public/js'));
app.use('/img', express.static('./public/img'));
app.use('/fonts', express.static('./public/fonts'));

// Add all controllers
app.use(require('./controllers/views'));
app.use(require('./controllers/auth'));
// Map api
app.use('/api/users', require('./controllers/users'));
app.use('/api/products', require('./controllers/products'));
app.use('/api/comments', require('./controllers/comments'));

module.exports = app;