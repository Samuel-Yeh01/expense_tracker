const express = require("express");
const router = express.Router();
const { autenticated } = require("../config/auth");
// importing models
const Record = require("../models/record");

// importing utils
const { currentTime } = require("../utils/getCurrentTime");

// importing express-validator & check condition arrays
const { check, validationResult } = require("express-validator");
const { newRecordCheck } = require("../utils/backend-validation");

// add new record
router.get("/new", autenticated, (req, res) => {
  //create a function to get the current time to put in view
  const result = `${currentTime.year}-${currentTime.month}-${currentTime.date}`;
  res.render("new", { result });
});

router.post("/new", autenticated, newRecordCheck, (req, res) => {
  // redirect if input is invalid
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("new", { errors: errors.array() });
  }
  const newRecord = new Record();
  Object.assign(newRecord, req.body);
  Object.assign(newRecord, { userId: req.user._id });
  newRecord.save(err => {
    if (err) return console.log(err);
    res.redirect("/");
  });
});

//edit page
router.get("/edit/:id", autenticated, (req, res) => {
  Record.findOne({ _id: req.params.id }, (err, record) => {
    if (err) return console.log(err);
    // slice record.date so then it could be used in edit.handlebars as value = {{record_date}}
    const record_date = JSON.stringify(record.date).slice(1, 11);
    res.render("edit", { record, record_date });
  });
});

router.put("/edit/:id", autenticated, newRecordCheck, (req, res) => {
  Record.findOne(
    { _id: req.params.id, userId: req.user._id },
    (err, record) => {
      if (err) return console.log(err);
      // assign form input data to record
      Object.assign(record, req.body);
      record.save(err => {
        if (err) return console.log(err);
        res.redirect("/");
      });
    }
  );
});

// remove record
router.delete("/:id", autenticated, (req, res) => {
  Record.findOne(
    { _id: req.params.id, userId: req.user._id },
    (err, record) => {
      if (err) return console.log(err);
      record.remove(err => {
        if (err) return console.log(err);
        res.redirect("/");
      });
    }
  );
});

module.exports = router;
