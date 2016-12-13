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
     * @api {get} /user/:id Request User information
     * @apiName GetUser
     * @apiGroup User
     *
     * @apiParam {Number} id Users unique ID.
     *
     * @apiSuccess {String} firstname Firstname of the User.
     * @apiSuccess {String} lastname  Lastname of the User.
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
