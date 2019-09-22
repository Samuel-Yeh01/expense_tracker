// introduce models
const Record = require("../record");
const User = require("../user");
const mongoose = require("mongoose");

// introduce data
const userData = require("./user.json").results;
const recordData = require("./record.json").results;

// introduce bcrypts
const bcrypts = require("bcryptjs");

// setting db connect
mongoose.connect("mongodb://127.0.0.1/record", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

db.on("error", () => {
  console.log("error");
});

db.once("open", () => {
  //create users
  userData.forEach((item, index) => {
    bcrypts.genSalt(10, (err, salt) => {
      bcrypts.hash(item.password, salt, (err, hash) => {
        const newUser = new User({
          name: item.name,
          password: hash,
          email: item.email
        });
        newUser
          .save()
          .then(user => {
            for (let i = index * 3; i < (index + 1) * 3; i++) {
              Record.create({
                userId: user._id,
                name: recordData[i].name,
                amount: recordData[i].amount,
                category: recordData[i].category,
                date: recordData[i].date
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    });
  });
  console.log("db connected!");
});
