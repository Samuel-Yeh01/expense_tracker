// introduce express and mongoose
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// 判別 develope environment
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// introduce tools
const methodOverride = require("method-override");
const flash = require("connect-flash");

// introduce models
const Record = require("./models/record");
const User = require("./models/user");

// introduce view template
const exphbs = require("express-handlebars");
const Handlebars = require("handlebars");

// introduce passport and session
const session = require("express-session");
const passport = require("passport");

// introduce console dresser
const chalk = require("chalk");

// introduce body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// setting static files
app.use(express.static("public"));

// setting connect-flash
app.use(flash());

// setting method-override
app.use(methodOverride("_method"));

// setting handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    helpers: {
      addUp: function(value) {
        return value + 5;
      },
      get_date: function(date) {
        const record_date = JSON.stringify(date).slice(1, 11);
        return record_date;
      },
      get_image: function(category_image, category) {
        return category_image[category];
      },
      if_selected: function(category_value, category) {
        return category_value === category ? "selected" : "";
      }
    }
  })
);
app.set("view engine", "handlebars");
Handlebars.registerHelper("bold", function(options) {
  return '<h1 class="mybold bg-primary">' + options.fn(this) + "</h1>";
});

// setting DB connection
mongoose.connect("mongodb://127.0.0.1/record", {
  useNewUrlParser: true,
  useCreateIndex: true
});

const db = mongoose.connection;

db.on("error", () => {
  console.log(chalk.red.bold.inverse("db connect fail!"));
});

db.once("open", () => {
  console.log(chalk.green.bold.inverse("db connected!"));
});

// setting session
app.use(
  session({
    secret: "my secret key",
    resave: false,
    saveUninitialized: false
  })
);

// setting passport
app.use(passport.initialize());
app.use(passport.session());

// introduce passport config
require("./config/passport")(passport);

// setting local variable to use in views
app.use((req, res, next) => {
  res.locals.userName = "Danny";
  res.locals.user = req.user;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.warning_msg = req.flash("warning_msg");
  res.locals.isAuthenticated = req.isAuthenticated;
  next();
});
// setting routes
app.use("/", require("./routes/home.js"));
app.use("/users", require("./routes/user"));
app.use("/record", require("./routes/record"));
app.use("/auth", require("./routes/auth"));

// setting sever
app.listen(3000, () => {
  console.log("you are now listening at port 3000");
});
