const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Naveena@may20",
  database: "test"
});

mysqlConnection.connect(function(err) {
  if (!err) {
    console.log("My SQL Connected!");
  } else {
    console.log("DB connection failed :" + JSON.stringify(err, undefined, 2));
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

//GET all USERS
app.get("/users", (req, res) => {
  mysqlConnection.query("SELECT * FROM users", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

//GET all USERS based on id
app.get("/users/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM users WHERE ID=?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

//DELETE USERS based on ID
app.delete("/users/:id", (req, res) => {
  mysqlConnection.query(
    "DELETE FROM users WHERE ID=?",
    [req.params.id],
    err => {
      if (!err) {
        res.send("User deleted Successfully");
      } else {
        console.log(err);
      }
    }
  );
});

//Insert an employees
app.post("/users/add", (req, res) => {
  let user = req.body;
  console.log(user);
  mysqlConnection.query("INSERT INTO users SET ?", user, err => {
    if (!err) {
      res.send("User inserted Successfully");
    } else {
      console.log(err);
    }
  });
});

// Update an employees
app.put("/update/:id", (req, res) => {
  console.log(req.params.id);
  let user = req.body;
  console.log("+++++++++++", user);
  mysqlConnection.query(
    "update users set name=?, age=?,email=? where id=?",
    [user.name, user.age, user.email, req.params.id],
    err => {
      if (!err) {
        res.send("User updated Successfully");
      } else {
        console.log(err);
      }
    }
  );
});
