const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

// User model
const User = require("../models/User");
//Login Page
router.get("/login", (req, res) => res.render("login"));

// Register Page
router.get("/register", (req, res) => res.render("register"));

//Register Handle
router.post("/register", (req, res) => {
  // destructurer // faciliter l'ecriture du code
  const { name, email, password, password2 } = req.body;
  //creation d'un tableau qui contiendra
  let errors = [];

  // Check required fields

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "please fill in all fields" });
  }

  // Check passwords match
  if (password !== password2) {
    errors.push({ msg: "Password do not match" });
  }

  // Check Pass Length

  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characteres" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    // Validation passed

    User.findOne({ email: email }).then(user => {
      if (user) {
        //User exist
        errors.push({ msg: "Email is already registered" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });
        console.log(newUser);

        // Hash password

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // Set password to hashed
            newUser.password = hash;
            // Save User
            newUser
              .save()
              .then(user => {
                req.flash(
                  "succes_msg",
                  "You are now registered and can log in"
                );
                res.redirect("/users/login");
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login Handle

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
});

//Logout Handle

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

module.exports = router;
