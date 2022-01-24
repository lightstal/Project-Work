const database = require('../database');
const config = require('../config');

module.exports = {
    findAllAssociated: function (callback) {
        let conn = database.getConnection();
        conn.connect((err) => {
            if (err) return callback(err, null);

            let sql = `SELECT comments.id, comments.comment, comments.created_at, comments.user_id,
                users.username, users.firstname, users.lastname, users.email, users.role
                FROM comments, users WHERE comments.user_id = users.id`;
            conn.query(sql, (err, results) => {
                conn.end();
                callback(err, results);
            });
        });
    },
    findAll: function (callback) {
        let conn = database.getConnection();
        conn.connect((err) => {
            if (err) return callback(err, null);

            let sql = `SELECT * FROM comments`;
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

            let sql = `SELECT * FROM comments WHERE id = ?`;
            conn.query(sql, [id], (err, results) => {
                conn.end();
                if (err) return callback(err, null);
                if (results.length < 1) return callback(null, null);
                callback(null, results[0]);
            });
        });
    },
    insert: function (comment, callback) {
        let conn = database.getConnection();
        conn.connect((err) => {
            if (err) return callback(err, null);

            let sql = `INSERT INTO comments (user_id, comment) VALUES (?, ?)`;
            let params = [comment.userId, comment.comment];
            conn.query(sql, params, (err, results) => {
                conn.end();
                if (err) return callback(err, null);
                callback(null, { id: results.insertId });
            });
        });
    },
    update: function (comment, callback) {
        let conn = database.getConnection();
        conn.connect((err) => {
            if (err) return callback(err, null);

            let sql = `UPDATE comments SET user_id = ?, comment = ? WHERE id = ?`;
            let params = [comment.userId, comment.comment, comment.id];
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

            let sql = `DELETE FROM comments WHERE id = ?`;
            conn.query(sql, [id], (err, results) => {
                conn.end();
                if (err) return callback(err, null);
                if (results.affectedRows < 1) return callback(null, null);
                return callback(null, { id });
            });
        });
    }
}