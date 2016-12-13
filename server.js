let restify = require("restify"),
    port = process.env.port || 8000,
    authentificationMetier = require("./metier/AuthentificationMetier");
    //mongoose = require("mongoose")

//Création du serveur
let server = restify.createServer({
    name : "sport_server"
});

//mongoose.connect("mongodb://localhost/sport");

//Plugin
server.use(restify.gzipResponse());
server.use(restify.fullResponse());
server.use(restify.queryParser());
server.use(restify.bodyParser());

//Middleware
server.use(function(req, res, next){

    if(!req.url.startsWith("/api/"))
    {
        return next();
    }

    const token = authentificationMetier.getToken(req);
    if(!token)
    {
        res.send(401, "Non autorisé");
    }

    const verified = authentificationMetier.decode(token);
    if(!verified)
    {
        res.send(401, "Non autorisé");
    }

    return next();
});

//UserController
const UserController = require("./controller/UserController");
const userController = new UserController(server);

const SportifController = require("./controller/SportifController");
const sportifController = new SportifController(server);

const EntrepriseController = require("./controller/EntrepriseController");
const entrepriseController = new EntrepriseController(server);

// sub routes
/*const place = require('./controller/UserController');

const api = new Route()
    //.setPath('/api')
    .addRoutes([place])
    .attach(server);*/

server.listen(port, function() {
    console.log('%s listening at %s', server.name, server.url);
});