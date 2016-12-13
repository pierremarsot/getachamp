class UserDao {
    constructor(mysql)
    {
        this._mysql = mysql;
    }

    getById(id, callback) {
        this._mysql.query("SELECT * FROM user u WHERE u.id = ?", [id], (err, results) => {
            if (err) {
                return callback("Erreur lors de la récupération de votre compte utilisateur");
            }

            if(!results || results.length === 0)
            {
                return callback(null, null);
            }

            return callback(null, results[0]);
        });
    }

    get(email, password, callback) {
        this._mysql.query("SELECT * FROM user u WHERE u.email = ? AND u.password = ?", [email, password], (err, results) => {
            if (err) {
                return callback("Erreur lors de la récupération de votre compte utilisateur");
            }

            if(!results || results.length === 0)
            {
                return callback(null, null);
            }

            return callback(null, results[0]);
        });
    }

    add(nom, prenom, email, password, callback) {
        this.get(email, password, (error, data) => {
            if (error) {
                return callback(error);
            }

            if(data)
            {
                return callback("Un compte utilisateur existe déjà avec cet email");
            }

            const user = {nom: nom, prenom: prenom, email: email, password: password};
            this._mysql.query('INSERT INTO user SET ?', user, (err, result) => {
                if (err) {
                    return callback("Erreur lors de la création de votre compte");
                }

                callback(null, result.insertId);
            });
        });
    }
}

module.exports = UserDao;