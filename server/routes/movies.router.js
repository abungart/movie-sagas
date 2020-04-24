const express = require("express");
const router = express.Router();
const pool = require("..modules/pool");

// GET DATA FROM DATABASE
router.get("/", (req, res) => {
  const queryText = "SELECT * FROM movies";
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error completing GET plats query", err);
      res.sendStatus(500);
    });
});

module.exports = router;
