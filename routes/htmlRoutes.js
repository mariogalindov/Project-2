var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        title: "Medik Home",
        condition: false,
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load appointment page
  app.get("/appointment", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("appointment", {
        title: "Medik appointment",
        condition: false,
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
