const SportifMetier = require("../metier/SportifMetier");
const mysql = require('../db');

class SportifController{
    constructor(server)
    {
        server.post("/sportif", this.register);
    }

    register(req, res, next)
    {
        const sportifMetier = new SportifMetier(req, mysql);

        mysql.beginTransaction(function(err) {
            if (err) {
                res.send(404, "Erreur lors de la connexion au serveur");
            }

            sportifMetier.add((error, results) => {
                if(error)
                {
                    return mysql.rollback(function() {
                        res.send(error.status, error.message);
                        return next();
                    });
                }
                else
                {
                    mysql.commit(function(err) {
                        if (err) {
                            return mysql.rollback(function() {
                                res.send(error.status, error.message);
                                return next();
                            });
                        }
                        res.send(results.status, results.message);
                        return next();
                    });
                }
            });
        });

    }
}

module.exports = SportifController;