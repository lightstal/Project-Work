const jwt = require('jsonwebtoken');

const config = require('../config');

module.exports = function() {
    return function(req, res, next) {
        let headers = req.headers.authorization;
        if (!headers || !headers.startsWith('Bearer ')) {
            return res.status(401).send({ message: 'missing authentication headers' });
        }

        let token = headers.replace('Bearer ', '');
        jwt.verify(token, config.jwt.secret, (err, user) => {
            if (err) return res.status(401).send({ message: 'invalid token' });
            req.entity = user;
            next();
        });
    };
};