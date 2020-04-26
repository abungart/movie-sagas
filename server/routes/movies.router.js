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

module.exports = router;
