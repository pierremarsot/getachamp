const mysql = require('mysql');

//Connexion à la bdd
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'pierre',
    password : 'logitech03',
    database : 'sport'
});

connection.connect();

module.exports = connection;