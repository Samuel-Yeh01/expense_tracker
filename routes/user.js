const express = require("express");
const router = express.Router();
const passport = require("passport");
// introduce models for new docs in DB
const Record = require("../models/record");
const User = require("../models/user");

// introduce bcrypt for password hash
const bcrypt = require("bcryptjs");

// introduce express-validator for back-end validation
const { check, validationResult } = require("express-validator");
const { newUserCheck } = require("../utils/backend-validation");
// login page
router.get("/login", (req, res) => {
  res.render("login", { errors: [{ message: req.flash("error") }] });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
});

// register page
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", newUserCheck, (req, res) => {
  // if validation fails,redirect
  const err_msg = validationResult(req);
  if (!err_msg.isEmpty()) {
    return res.render("register", { err_msg: err_msg.array() });
  }
  const { name, email, password, password2 } = req.body;
  let errors = [];
  if (!name || !email || !password || !password2) {
    errors.push({ message: "所有欄位皆必填!" });
  }
  if (password !== password2) {
    errors.push({ message: "兩次密碼輸入不同!" });
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
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ message: "此信箱已被註冊過!" });
        console.log("User already exist!");
        res.render("register", { errors, name, email, password, password2 });
      } else {
        //else add new user to DB
        const newUser = new User({
          name,
          email,
          password
        });
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) console.log(err);
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                res.redirect("/");
              })
              .catch(err => {
                console.log(err);
              });
          })
        );
      }
    });
  }
});

// logout
router.get("/logout", (req, res) => {
  req.logOut();
  req.flash("success_msg", "已成功登出");
  res.redirect("/users/login");
});

module.exports = router;
