var express = require("express");

var router = express.Router();
var db = require("../models");
// Import the model (cat.js) to use its database functions.

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  db.burgers.findAll({}).then(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(data);
    res.render("index", hbsObject);
  });
});

router.post("/", function(req, res) {
  db.burgers.create(req.body).then(function(data) {
    res.redirect("/")
  })
});

router.put("/:id", function(req, res) {
  console.log("req devoured"+ req.body.devoured);
  console.log("req id"+ req.params.id);

  db.burgers.update({
    devoured: req.body.devoured,
    }, {
    where: {
      id: req.params.id
    }
    }).then(function(data) {
    res.redirect("/");
    });
});




// Export routes for server.js to use.
module.exports = router;