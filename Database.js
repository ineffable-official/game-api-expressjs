const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "37920320",
  database: "game_rest",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Database successfully connected");
});

module.exports = connection;
