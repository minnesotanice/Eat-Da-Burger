var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.

////////////////////////////////
router.route("/")
  .get(function (req, res) {
    // res.send("test GET route");

    burger.all(function (data) {
      var hbsObject = {
        burgers: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });


  })
  .post(function (req, res) {
    // res.send("test POST route");
    console.log("this is the req.body: ", req.body)
    burger.create([
      "burger_name", "eaten"
    ], [
      req.body.burger_name, req.body.eaten
    ], function (result) {
      // Send back the ID of the new quote
      res.json({
        id: result.insertId
      });
    });

  })


router.route("/:id")
  .put(function (req, res) {

    var condition = "id = " + req.params.id;

    console.log("condition is ", condition);

    burger.update({
      eaten: true
    }, condition, function (result) {

      // console.log("after res.json");
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
        
    });

    console.log("hit the route!: ", req.params)
    res.send("a test PUT request")

    
    
  })


/*
router.get("/", function(req, res) {

  burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
  
});

router.post("/api/burgers", function(req, res) {
  burger.create([
    "burger_name", "eaten_staus"
  ], [
    req.body.burger_name, req.body.eaten_staus
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({
    eaten_staus: req.body.eaten_staus
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});
*/




// Export routes for server.js to use.
module.exports = router;