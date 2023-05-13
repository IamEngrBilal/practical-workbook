/** @format */
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const mongoose = require('mongoose')
const passport = require("passport");
const User = require("./models/User");
const userRoutes = require("./routes/user")
const todoRoutes = require("./routes/todo")

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "my little secret.",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://localhost:27017/todoDB")
  .then(() => {
    console.log("Connected")
  });


passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});


//Routes
app.use("/api",userRoutes);
app.use("/api",todoRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port 3000");
});
