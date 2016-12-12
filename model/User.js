/*const mongorito = require('mongorito');
 const Model = mongorito.Model;

 class User extends Model
 {

 }
 */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    nom: {type: String, unique: true},
    prenom: String,
    email: String,
    password: String
});

const User = mongoose.model("user", userSchema);

module.exports = User;

module.exports.find = (email, password, callback) => {
    User.findOne({
        email : email,
        password : password
    }, callback);
};

module.exports.findByEmail = (email, callback) => {
    User.findOne({email : email}, callback);
};

module.exports.addUser = (user, callback) => {
    User.create(user, callback);
};