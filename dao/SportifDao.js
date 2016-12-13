const userDao = require("./UserDao");

class SportifDao{
    constructor(mysql)
    {
        this._mysql = mysql;
        this._userDao = new userDao(this._mysql);
    }

    add(nom, prenom, email, password, callback) {
        this._userDao.add(nom, prenom, email, password, (error, idUser) => {
            if(error)
            {
                return callback(error);
            }
            else
            {
                const sportif = {
                    id : idUser
                };

                this._mysql.query("INSERT INTO sportif SET ?", [sportif], (err) => {
                    if(err)
                    {
                        return callback(err);
                    }
                    else
                    {
                        return callback(null, idUser);
                    }
                });
            }
        });
    }
}

module.exports = SportifDao;