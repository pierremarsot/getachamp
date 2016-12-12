const jwt = require('jsonwebtoken');

class AuthentificationMetier{
    constructor()
    {
        this._key = "MEETWINKEYSH256@AUTHENTIFCATION#SPORT";
    }

    getToken(req)
    {
        //On parse le token via la requête
        let token = null;

        console.log(req.params);
        console.log(req.body);
        console.log(req.query);

        if(req.params && req.params.token)
        {
            token = req.params.token;
        }
        else if(req.body && req.body.token)
        {
            token = req.body.token;
        }
        else if(req.query && req.query.token)
        {
            token = req.query.token;
        }

        return token;
    }

    encode(idUser)
    {
        return jwt.sign({idUser : idUser}, this._key);
    }

    decode(token)
    {
        try {
            const user = jwt.verify(token, this._key);
            console.log(user.id)

            return user.idUser;
        } catch(err) {
            return null;
        }

    }

    invalid(token)
    {
        try {
            const success = jwt.verify(token, 'wrong-secret');
            console.log(success);
            return success;
        } catch(err) {
            console.log(err);
            return false;
        }
    }
}

module.exports = new AuthentificationMetier();