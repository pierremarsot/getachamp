const mysql = require('../db');

class UserDao {
    constructor() {

    }

    getById(id, callback) {
        mysql.query("SELECT * FROM user u WHERE u.id = ?", [id], (err, results) => {
            if (err || !results) {
                callback(null);
                return;
            }

            callback(results[0]);
        });
    }

    get(email, password, callback) {
        mysql.query("SELECT * FROM user u WHERE u.email = ? AND u.password = ?", [email, password], (err, results) => {
            if (err || !results || results.length === 0) {
                callback(null);
                return;
            }

            callback(results[0]);
        });
    }

    add(nom, prenom, email, password, callback) {
        this.get(email, password, (data) => {
            if (data !== null) {
                callback(null);
                return;
            }

            const user = {nom: nom, prenom: prenom, email: email, password: password};
            mysql.query('INSERT INTO user SET ?', user, (err, result) => {
                if (err) {
                    callback(null);
                    return;
                }

                callback(result.insertId);
            });
        });
    }
}

module.exports = new UserDao();