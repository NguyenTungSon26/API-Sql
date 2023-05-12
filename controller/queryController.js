const connection = require("../model/database");

const test = (req, res) => {
  const sql = `SELECT * from actor`;

  // thực hiện truy vấn SQL
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error query: " + err);
      res.status(500).send("Error query database");
      return;
    }
    res.json(results);
  });
};
const test1 = (req, res) => {
  const sql = `SELECT * from payment`;

  // thực hiện truy vấn SQL
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error query: " + err);
      res.status(500).send("Error query database");
      return;
    }
    res.json(results);
  });
};

module.exports = { test, test1 };
