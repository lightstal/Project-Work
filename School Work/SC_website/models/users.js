const database = require('../database');
const config = require('../config');

// TODO: Clean up legacy code

module.exports = {
    findAll: function (callback) {
        let conn = database.getConnection();
        conn.connect((err) => {
            if (err) return callback(err, null);

            let sql = `SELECT id, username, firstname, lastname, email, role FROM users`;
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

            let sql = `SELECT id, username, firstname, lastname, email, role, created_at FROM users WHERE id = ${id}`;
            conn.query(sql, (err, results) => {
                conn.end();
                if (err) return callback(err, null);
                if (results.length < 1) return callback(null, null);
                callback(null, results[0]);
            });
        });
    },
    insert: function (user, callback) {

        let conn = database.getConnection();
        conn.connect((err) => {
            if (err) return callback(err, null);

            let sql = `INSERT INTO users (username, password, firstname, lastname, email) VALUES (?, ?, ?, ?, ?)`;
            let params = [user.username, user.password, user.firstname, user.lastname, user.email];
            conn.query(sql, params, (err, results) => {
                conn.end();
                if (err) return callback(err, null);
                callback(null, { id: results.insertId });
            });
        });

    },
    update: function (user, callback) {

        let conn = database.getConnection();
        conn.connect((err) => {
            if (err) return callback(err, null);

            let sql = `UPDATE users SET username = ?, password = ?, firstname = ?, lastname = ?, email = ? WHERE id = ?`;
            let params = [user.username, user.password, user.firstname, user.lastname, user.email, user.id];
            for (let param of params) {
                sql = sql.replace('?', `"${param}"`);
            }

            conn.query(sql, (err, results) => {
                conn.end();
                if (err) return callback(err, null);
                if (results.affectedRows < 1) return callback(null, null);
                callback(null, { id: user.id });
            });
        });

    },
    delete: function (id, callback) {
        let conn = database.getConnection();
        conn.connect((err) => {
            if (err) return callback(err, null);

            let sql = `DELETE FROM users WHERE id = ?`;
            conn.query(sql, [id], (err, results) => {
                conn.end();
                if (err) return callback(err, null);
                if (results.affectedRows < 1) return callback(null, null);
                callback(null, { id });
            });
        });
    },
    verify: function (username, password, callback) {
        let conn = database.getConnection();
        conn.connect((err) => {
            if (err) return callback(err, null);

            let sql = `SELECT id, password, username, firstname, lastname, email, role FROM users WHERE username = ? and password=?`;
            conn.query(sql, [username, password], (err, results) => {
                conn.end();
                if (err) return callback(err, null);
                if (results.length < 1) return callback(null, null);
                else {
                    user=results[0];
                    delete user.password;
                    return callback(null, user);
                }

            });
        });
    }
}