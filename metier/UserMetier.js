const userDao = require("../dao/UserDao");
const authentificationMetier = require("./AuthentificationMetier");
const BaseMetier = require("./BaseMetier");
const validator = require("validator");

class UserMetier extends BaseMetier {
    constructor(req)
    {
        super(req);
    }

    logIn(callback)
    {
        //On vérifie qu'on ait l'email
        if(!this._req.query.email)
        {
            callback(this.generateResponse(404, "L'email de l'utilisateur est inconnu"));
        }

        //On vérifie qu'on ait le mot de passe
        if(!this._req.query.password)
        {
            callback(this.generateResponse(404, "Le mot de passe de l'utilisateur est inconnu"));
        }

        /*const email = "encom.agency@gmail.com";
        const password = "logitech03";*/

        //On récup les informations
        const email = this._req.query.email;
        const password = this._req.query.password;

        //On vérifie que l'email soit valide
        if(!validator.isEmail(email))
        {
            callback(this.generateResponse(404, "L'email n'est pas au bon format"));
        }

        //On récup le compte utilisateur
        userDao.get(email, password, (user) => {

            //Si on a pas d'user, on envoie une erreur
            if(!user)
            {
                return callback(this.generateResponse(404, "User not found"));
            }

            //Si on arrive pas à récup l'id, en envoie une erreur
            if(!user.id)
            {
                callback(this.generateResponse(404, "Erreur lors de la récupération de votre compte"));
            }

            //Génération d'un token
            const token = authentificationMetier.encode(user.id);
            if(!token)
            {
                callback(this.generateResponse(404, "Erreur lors de la génération du token d'authentification"));
            }

            callback(null, this.generateResponse(200, token));
        });
    }

    logOut(callback)
    {
        //On récup le token de la requête
        const token = this.getToken();

        if(!token)
        {
            callback(this.generateResponse(404, "Erreur lors de la récupération du token"));
        }

        if(!authentificationMetier.invalid(token))
        {
            callback(this.generateResponse(404, "Erreur lors de la déconnexion"));
        }

        callback(this.generateResponse(200));
    }

    register(callback)
    {
        if(!this._req.body.hasOwnProperty("nom"))
        {
            callback(this.generateResponse(404, "Le nom du l'utilisateur est inconnu"));
        }

        if(!this._req.body.hasOwnProperty("prenom"))
        {
            callback(this.generateResponse(404, "Le prénom de l'utilisateur est inconnu"));
        }

        if(!this._req.body.hasOwnProperty("email"))
        {
            callback(this.generateResponse(404, "L'email de l'utilisateur est inconnu"));
        }

        if(!this._req.body.hasOwnProperty("password"))
        {
            callback(this.generateResponse(404, "Le mot de passe de l'utilisateur est inconnu"));
        }

        const nom = this._req.body.nom;
        const prenom = this._req.body.prenom;
        const email = this._req.body.email;
        const password = this._req.body.password;

        /*const nom = "pierre";
        const prenom = "pierre";
        const email = "encom.agency@gmail.com";
        const password = "logitech03";*/

        if(!validator.isEmail(email))
        {
            callback(this.generateResponse(404, "L'email n'est pas au bon format"));
        }

        userDao.add(nom, prenom, email, password, (id) => {
            if(!id)
            {
                callback(this.generateResponse(404, "Erreur lors de la création du compte utilisateur"));
            }

            const token = authentificationMetier.encode(id);
            if(!token)
            {
                callback(this.generateResponse(404, "Erreur lors de la génération du token d'authentification"));
            }

            callback(null, this.generateResponse(200, token));
        });
    }
}

module.exports = UserMetier;