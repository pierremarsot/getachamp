const UserDao = require("../dao/UserDao");
const authentificationMetier = require("./AuthentificationMetier");
const BaseMetier = require("./BaseMetier");
const validator = require("validator");

class UserMetier extends BaseMetier {
    constructor(req, mysql)
    {
        super(req, mysql);
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

        //Création de l'user dao
        const userDao = new UserDao(this._mysql);

        //On récup le compte utilisateur
        userDao.get(email, password, (error, user) => {

            //Si on a pas d'user, on envoie une erreur
            if(error)
            {
                return callback(this.generateResponse(404, error));
            }

            //Si on arrive pas à récup l'id, en envoie une erreur
            if(!user || !user.id)
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
}

module.exports = UserMetier;