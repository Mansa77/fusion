const express = require("express");
const router = express.Router();
var Project = require("../models/Project");

router.get("/", function(req, res) {
  res.render("admin/admin.ejs");
});

router.get("/project/create", function(req, res) {
  res.render("admin/projects-create.ejs");
});

//ROUTES POST
router.post("/post-projects", (req, res) => {
  var project = new Project(req.body);

  project.save(function(err, Project) {
    if (err) {
      res.send(err);
    }
    res.redirect("/admin/project/create");
    //res.status(201).json(Project);
  });
});

router.get("/projets", function(req, res) {
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

//ROUTES POST
router.post("/post-projects", (req, res) => {
  var project = new Project(req.body);

  project.save(function(err, Project) {
    if (err) {
      res.send(err);
    }
    res.redirect("/admin/projets");
    //res.status(201).json(Project);
  });
});

module.exports = router;
