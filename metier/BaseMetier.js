const authentificationMetier = require("./AuthentificationMetier");

class BaseMetier {
    constructor(req) {
        this._token = authentificationMetier.getToken(req);
        this._req = req;
    }

    getToken() {
        return this._token;
    }

    generateResponse(status, message) {
        return {
            status: status,
            message: message
        };
    }
}

module.exports = BaseMetier;