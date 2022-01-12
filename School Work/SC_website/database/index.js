const mysql = require('mysql');

const config = require('../config');

module.exports = {
    getConnection: function() {
        return mysql.createConnection(config.mysql);
    }
}