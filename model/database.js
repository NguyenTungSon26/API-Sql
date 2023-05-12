const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tumotden2",
  database: "sakila",
});

module.exports = connection;
