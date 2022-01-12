module.exports = function(properties) {
    return function(req, res, next) {
        for (let key of properties) {
            if (!req.body[key]) return res.status(400).send({ message: 'missing entity params' });
        }
        next();
    };
};