const express = require("express");
//const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");


const db = mysql.createPool({
  host: "34.77.86.206",
  port: "3306",
  user: "root",
  password: "Passw0rd",
  database: "CRUDDataBase",
});


/*
app.get("/", (req, res) => {
    const sqlInsertt = "INSERT INTO movie_reviews (movieName, movieReview) VALUES ('PU', 'Mola');"
    db.query(sqlInsertt, (err, result) => {
        res.send("hello world patillitas");
    })
});
*/

//MIDDLEWARE
app.use(cors());
/*app.use(bodyParser.urlencoded({exended: true}))*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//ENDPOINTS
app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * from movie_reviews";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;
  const sqlInsert =
    "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)";
  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    console.log(result);
  });
});

app.delete("/api/delete/:movieName", (req, res) => {
  const name = req.params.movieName;
  const sqlDelete = "DELETE FROM movie_reviews WHERE movieName = ?";

  db.query(sqlDelete, name, (err, result) => {
    if (err) console.log(err);
  });
});

app.put("/api/update", (req, res) => {
    const name = req.body.movieName;
    const review = req.body.movieReview;
    const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";
  
    db.query(sqlUpdate, [review, name], (err, result) => {
      if (err) console.log(err);
    });
  });

app.listen(3001, () => {
  console.log("runninG on port 3001");
});
