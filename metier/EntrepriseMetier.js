const EntrepriseDao = require("../dao/EntrepriseDao");
const BaseMetier = require("./BaseMetier");
const authentificationMetier = require("./AuthentificationMetier");
const validator = require("validator");

class EntrepriseMetier extends BaseMetier{
    constructor(req, mysql)
    {
        super(req, mysql);
    }

    add(callback)
    {
        if(!this._req.body.hasOwnProperty("nomEntreprise"))
        {
            callback(this.generateResponse(404, "Le nom de l'entreprise est inconnu"));
        }

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

        const nomEntreprise = this._req.body.nomEntreprise;
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

        const entrepriseDao = new EntrepriseDao(this._mysql);

        entrepriseDao.add(nomEntreprise, nom, prenom, email, password, (error, idEntreprise) => {
            if(error)
            {
                callback(this.generateResponse(404, error));
            }

            const token = authentificationMetier.encode(idEntreprise);
            if(!token)
            {
                callback(this.generateResponse(404, "Erreur lors de la génération du token d'authentification"));
            }

            callback(null, this.generateResponse(200, token));
        });
    }
}