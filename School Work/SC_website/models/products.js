const database = require('../database');
const config = require('../config');

module.exports = {
    findAll: function (callback) {
        let conn = database.getConnection();
        conn.connect((err) => {
            if (err) return callback(err, null);

            let sql = `SELECT * FROM products`;
            conn.query(sql, (err, results) => {
                conn.end();
                callback(err, results);
            });
        });
    },
    findMatching: function(search, callback) {
        let conn = database.getConnection();
        conn.connect((err) => {
            if (err) return callback(err, null);

            let sql = `SELECT * FROM products WHERE name LIKE '%${search}%' OR description LIKE '%${search}%'`;
            conn.query(sql, (err, results) => {
                conn.end();
                callback(err, results);
            });
        });
    },
    findById: function (id, callback) {
        let conn = database.getConnection();
        conn.connect((err) => {
            if (err) return callback(err, null);

            let sql = `SELECT * FROM products WHERE id = ?`;
            conn.query(sql, [id], (err, results) => {
                conn.end();
                if (err) return callback(err, null);
                if (results.length < 1) return callback(null, null);
                callback(null, results[0]);
            });
        });
    },
    insert: function (product, callback) {
        let conn = database.getConnection();
        conn.connect((err) => {
            if (err) return callback(err, null);

            let sql = `INSERT INTO products (name, description, price, quantity) VALUES (?, ?, ?, ?)`;
            let params = [product.name, product.description, product.price, product.quantity];
            conn.query(sql, params, (err, results) => {
                conn.end();
                if (err) return callback(err, null);
                callback(null, { id: results.insertId });
            });
        });
    },
    update: function (product, callback) {
        let conn = database.getConnection();
        conn.connect((err) => {
            if (err) return callback(err, null);

            let sql = `UPDATE products SET name = ?, description = ?, price = ?, quantity = ? WHERE id = ?`;
            let params = [product.name, product.description, product.price, product.quantity, product.id];
            conn.query(sql, params, (err, results) => {
                conn.end();
                if (err) return callback(err, null);
                if (results.affectedRows < 1) return callback(null, null);
                callback(null, { id: product.id });
            });
        });
    },
    delete: function (id, callback) {
        let conn = database.getConnection();
        conn.connect((err) => {
            if (err) return callback(err, null);

            let sql = `DELETE FROM products WHERE id = ?`;
            conn.query(sql, [id], (err, results) => {
                conn.end();
                if (err) return callback(err, null);
                if (results.affectedRows < 1) return callback(null, null);
                return callback(null, { id });
            });
        });
    }
}