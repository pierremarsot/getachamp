let User = require('../model/User');
let UserMetier = require("../metier/UserMetier");
const mysql = require("../db");

class UserController {

    constructor(server)
    {
        //Création routes
        server.get("/login", this.logIn);
        server.get("/logout", this.logOut);
    }

    /**
     * @api {get} /entreprise Connexion d'un utilisateur
     * @apiName Connexion d'un utilisateur
     * @apiGroup User
     *
     * @apiExample Body :
     *      {
     *          email : "email",
     *          password : "password"
     *      }
     *
     * @apiSuccess
     *      {String} Token.
     * @apiError
     *       {String} Message d'erreur.
     */
    logIn(req, res, next)
    {
        const userMetier = new UserMetier(req, mysql);
        userMetier.logIn((error, results) => {
            if(error)
            {
                res.send(error.status, error.message);
                return next();
            }

            res.send(results.status, results.message);
            return next();
        });
    }

    /**
     * @api {get} /logout Déconnexion d'un utilisateur
     * @apiName Déconnexion d'un utilisateur
     * @apiGroup User
     *
     * @apiExample Body :
     *      {
     *          token : "token"
     *      }
     *
     * @apiSuccess
     *      {String} Message de succès.
     * @apiError
     *       {String} Message d'erreur.
     */
    logOut(req, res, next)
    {
        const userMetier = new UserMetier(req, mysql);
        userMetier.logOut((error, results) => {
            if(error)
            {
                res.send(error.status, error.message);
                return next();
            }

            res.send(results.status, results.message);
            return next();
        });
    }
}

module.exports = UserController;
