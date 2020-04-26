const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// GET DATA FROM DATABASE
router.get("/", (req, res) => {
  const queryText = "SELECT * FROM movies";
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error completing GET movie query", err);
      res.sendStatus(500);
    });
});

router.get("/genre/:id", (req, res) => {
  const queryText = `SELECT * from "genres"
JOIN "link" ON "link".genres_id = "genres".id
JOIN "movies" ON "link".movies_id = "movies".id
WHERE "movies".id = $1;`;

  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error completing GET genre query", err);
      res.sendStatus(500);
    });
});

// POST DATA TO DATABASE
router.post("/", (req, res) => {
  const newMovie = req.body;
  const queryText = `INSERT INTO movies ("title", "poster", "description")
                    VALUES ($1, $2, $3);`;
  const queryValues = [newMovie.title, newMovie.poster, newMovie.description];
  pool
    .query(queryText, queryValues)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("Error in POST MOVIE query", err);
      res.sendStatus(500);
    });
});

// DELETE DATA FROM DATABASE
router.delete("/:id", (req, res) => {
  const queryText = "DELETE FROM movies WHERE id=$1;";
  pool
    .query(queryText, [req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error in DELETE MOVIE query", err);
      res.sendStatus(500);
    });
});

// EDIT DATA IN DATABASE
router.put("/", (req, res) => {
  const updatedMovie = req.body;
  const queryText = `UPDATE movies SET "title" = $1, "description" = $2 WHERE "id" = $3;`;
  const queryValues = [
    updatedMovie.title,
    updatedMovie.description,
    updatedMovie.id,
  ];

  pool
    .query(queryText, queryValues)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error completing PUT query", err);
      res.sendStatus(500);
    });
});

module.exports = router;
