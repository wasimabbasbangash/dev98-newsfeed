const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/blogs", (req, res, next) => {
  var xml = "";
  axios
    .get("https://dev98.de/feed/", {
      headers: { "Content-Type": "text/xml", "User-Agent": "*" },
    })
    .then((response) => {
      xml = response.data;
      res.send(xml);
    });
});

module.exports = router;
