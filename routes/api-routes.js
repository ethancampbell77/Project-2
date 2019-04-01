// Requiring models and passport 
var db = require("../models");
var passport = require("../config/passport");
//
module.exports = function (app) {
  // Using the passport.authenticate middleware with the local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Using a POST with javascript, can't be redirected that post into a GET request
    // So sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authunticated
    res.json("/members");
  });
  //
  // Route for signing up a user. The user's password is automatically hashed and stored securely 
  //  If the user is created successfully, proceed to log the user in, otherwise send back an error
  app.post("/api/signup", function (req, res) {
    console.log(req.body);
    db.User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      gender: req.body.gender,
      dob: req.body.dob,
      email: req.body.email,
      password: req.body.password
    }).then(function () {
      res.redirect(307, "/api/login");
    }).catch(function (err) {
      console.log(err);
      res.json(err);
    });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });
  //
  // Route for getting some data about the user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's firstname and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        firstname: req.user.firstname,
        id: req.user.id
      });
    }
  });

};
