const UserDao = require("./UserDao");

class EntrepriseDao {
    constructor(mysql)
    {
        this._mysql = mysql;
        this._userDao = new UserDao(this._mysql);
    }

    add(nomEntreprise, nom, prenom, email, password, callback)
    {
        this._userDao.add(nom, prenom, email, password, (error, idEntreprise) => {
            if(error)
            {
                return callback(error);
            }

            const entreprise = {
                id : idEntreprise,
                nomEntreprise : nomEntreprise
            };

            this._mysql.query("INSERT INTO entreprise SET ?", [entreprise], (error) => {
                if(error)
                {
                    return callback("Erreur lors de la création de votre compte entreprise");
                }

                return callback(null, idEntreprise);
            });
        })
    }
}

module.exports = EntrepriseDao;