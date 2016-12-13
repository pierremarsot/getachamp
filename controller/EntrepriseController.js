const mysql = require("../db");
const EntrepriseMetier = require("../metier/EntrepriseMetier");

class EntrepriseController {
    constructor(server)
    {
        server.post("/entreprise", this.register);
    }

    /**
     * @api {post} /entreprise Ajouter une entreprise
     * @apiName Ajouter une entreprise
     * @apiGroup User
     *
     * @apiExample Body :
     *      {
     *          nomEntreprise : "nomEntreprise",
     *          nom : "nom",
     *          prenom : "prenom",
     *          email : "email",
     *          password : "password"
     *      }
     *
     * @apiSuccess
     *      {String} Token.
     * @apiError
     *       {String} Message d'erreur.
     */
    register(req, res, next)
    {
        const entrepriseMetier = new EntrepriseMetier(req, mysql);

        mysql.beginTransaction((err) => {
            if(err)
            {
                res.send(404, "Erreur lors de la connexion au serveur");
                return next();
            }

            entrepriseMetier.add((error, results) => {
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

module.exports = EntrepriseController;