let User = require('../model/User');
let UserMetier = require("../metier/UserMetier");

class UserController {

    constructor(server)
    {
        //Création routes
        server.get("/user", this.logIn);
        server.post("/user", this.register);
        server.get("/logOut", this.logOut);
        server.get("/api/actu", this.actualite);
    }

    logIn(req, res, next)
    {
        const userMetier = new UserMetier(req);
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

    logOut(req, res, next)
    {
        const userMetier = new UserMetier(req);
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

    register(req, res, next)
    {
        const userMetier = new UserMetier(req);
        userMetier.register((error, results) => {
            if(error)
            {
                res.send(error.status, error.message);
                return next();
            }

            res.send(results.status, results.message);
            return next();
        });
    }

    actualite(req, res, next)
    {
        const userMetier = new UserMetier(req);
        res.send(200);
        next();
    }
}

module.exports = UserController;
