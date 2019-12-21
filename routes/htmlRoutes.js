// var db = require("../models");

// module.exports = function(app) {
//   // Load index page
//   app.get("/", function(req, res) {
//     db.Specialization.findAll({}).then(function(dbExamples) {
//       res.render("index", {
//         msg: "Welcome!",
//         examples: dbExamples
//       });
//     });
//   });

//   // Load example page and pass in an example by id
//   app.get("/example/:id", function(req, res) {
//     db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
//       res.render("example", {
//         example: dbExample
//       });
//     });
//   });

//   // Render 404 page for any unmatched routes
//   app.get("*", function(req, res) {
//     res.render("404");
//   });
// };






// Dependencies
// =============================================================
var path = require("path");


// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../moqups/index.html"));
  });

  // // add route loads the add.html page, where users can enter new books to the db
  // app.get("/add", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/add.html"));
  // });

  // // all route loads the all.html page, where all books in the db are displayed
  // app.get("/all", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/all.html"));
  // });

  // // short route loads the short.html page, where short books in the db are displayed
  // app.get("/short", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/short.html"));
  // });

  // // long route loads the long.html page, where long books in the db are displayed
  // app.get("/long", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/long.html"));
  // });

};
