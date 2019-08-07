const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
var Project = require("../models/Project");

// Welcome page

router.get("/", (req, res) => res.render("welcome"));
// Welcome dashboard
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", { name: req.user.name });
});

router.get("/projects", function(req, res) {
  Project.find(function(err, projets) {
    console.log("es tu la");
    if (err) {
      req.render("pages/error404");
      console.log("les projets ne sont pas la");
    }
    console.log("coucou");
    res.render("projets", { projets: projets });

    //res.json(projets)
  });
});

module.exports = router;
