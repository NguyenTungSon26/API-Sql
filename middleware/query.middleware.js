const connection = require("../model/database");

const queryMiddleWare = (req, res, next) => {
  const sql = req.sql;
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error query: " + err);
      res.status(500).send("Error query database");
      return;
    }
    res.json(results);
  });
};

module.exports = queryMiddleWare;
