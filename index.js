const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;
const conn = require("./Database");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/player", (req, res) => {
  if (req.query.id) {
    var sql = "SELECT * FROM player WHERE id=?";
    var value = req.query.id;
    conn.query(sql, value, (err, rows, fields) => {
      if (err) {
        res.send({
          message: err.sqlMessage,
          timestamp: new Date(),
        });
      }

      res.send({
        message: "Successfully",
        data: rows,
        timestamp: new Date(),
      });
    });
  } else {
    var sql = "SELECT * FROM player WHERE 1";
    conn.query(sql, (err, rows, fields) => {
      if (err) {
        res.send({
          message: err.sqlMessage,
          timestamp: new Date(),
        });
      }
      res.send({
        message: "Successfully",
        data: rows,
        timestamp: new Date(),
      });
    });
  }
});

app.post("/player", (req, res) => {
  var sql = "INSERT INTO player(name) VALUES (?)";
  var name = req.body.name;

  conn.query(sql, name, (err, result) => {
    if (err) {
      res.send({
        message: err.sqlMessage,
        timestamp: new Date(),
      });
    }

    res.send({
      message: "Player adding successfully",
      data: {
        id: result.insertId,
      },
      timestamp: new Date(),
    });
  });
});

app.put("/player", (req, res) => {
  var sql = "UPDATE player SET name=? WHERE id=?";
  var value = [req.body.name, req.body.id];

  conn.query(sql, value, (err, result) => {
    if (err) {
      res.send({
        message: err.sqlMessage,
        timestamp: new Date(),
      });
    }

    res.send({
      message: "Player updated successfully",
      timestamp: new Date(),
    });
  });
});

app.get("/room", (req, res) => {
  if (req.query.id) {
    var sql = "SELECT * FROM room WHERE id=?";
    var value = req.query.id;
    conn.query(sql, value, (err, rows, fields) => {
      if (err) {
        res.send({
          message: err.sqlMessage,
          timestamp: new Date(),
        });
      }

      res.send({
        message: "Successfully",
        data: rows,
        timestamp: new Date(),
      });
    });
  } else {
    var sql = "SELECT * FROM room WHERE 1";
    conn.query(sql, (err, rows, fields) => {
      if (err) {
        res.send({
          message: err.sqlMessage,
          timestamp: new Date(),
        });
      }
      res.send({
        message: "Successfully",
        data: rows,
        timestamp: new Date(),
      });
    });
  }
});

app.post("/room", (req, res) => {
  var sql = "INSERT INTO room(name) VALUES (?)";
  var name = req.body.name;

  conn.query(sql, name, (err, result) => {
    if (err) {
      res.send({
        message: err.sqlMessage,
        timestamp: new Date(),
      });
    }

    res.send({
      message: "Room adding successfully",
      data: {
        id: result.insertId,
      },
      timestamp: new Date(),
    });
  });
});

app.put("/room", (req, res) => {
  var sql = "UPDATE room SET name=? WHERE id=?";
  var value = [req.body.name, req.body.id];

  conn.query(sql, value, (err, result) => {
    if (err) {
      res.send({
        message: err.sqlMessage,
        timestamp: new Date(),
      });
    }

    res.send({
      message: "Room updated successfully",
      timestamp: new Date(),
    });
  });
});

app.get("/gamematch", (req, res) => {
  if (req.query.room_id) {
    var sql = "SELECT * FROM game_match WHERE room_id=?";
    var value = req.query.room_id;
    conn.query(sql, value, (err, rows, fields) => {
      if (err) {
        res.send({
          message: err.sqlMessage,
          timestamp: new Date(),
        });
      }

      res.send({
        message: "Successfully",
        data: rows,
        timestamp: new Date(),
      });
    });
  } else {
    var sql = "SELECT * FROM game_match WHERE 1";
    conn.query(sql, (err, rows, fields) => {
      if (err) {
        res.send({
          message: err.sqlMessage,
          timestamp: new Date(),
        });
      }
      res.send({
        message: "Successfully",
        data: rows,
        timestamp: new Date(),
      });
    });
  }
});

app.post("/gamematch", (req, res) => {
  var sql =
    "INSERT INTO `game_match`( `room_id`, `player_id`, `snake_pos`, `snake_part`, `snake_length`) VALUES (?,?,'[0,0]','[[0,0]]',5);";
  var value = [req.body.room_id, req.body.player_id];

  conn.query(sql, value, (err, result) => {
    if (err) {
      res.send({
        message: err.sqlMessage,
        timestamp: new Date(),
      });
    }

    res.send({
      message: "Gamematch created successfully",
      data: {
        id: result.insertId,
      },
      timestamp: new Date(),
    });
  });
});

app.put("/gamematch", (req, res) => {
  var sql =
    "UPDATE game_match SET snake_pos=?,snake_part=?,snake_length=? WHERE room_id=? AND player_id=?";
  var value = [
    req.body.snake_pos,
    req.body.snake_part,
    req.body.snake_length,
    req.body.room_id,
    req.body.player_id,
  ];

  conn.query(sql, value, (err, result) => {
    if (err) {
      res.send({
        message: err.sqlMessage,
        timestamp: new Date(),
      });
    }

    res.send({
      message: "Gamematch updated successfully",
      timestamp: new Date(),
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
