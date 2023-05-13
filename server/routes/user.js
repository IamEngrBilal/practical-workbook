const router = require('express').Router();
const passport = require("passport");
const User = require("../models/User");


router.post('/register', (req,res)=>{

  User.register(
   { username: req.body.username },
   req.body.password,
   (err, user) => {
     if (err) {
       res.send(err) 
     } else {
      
       passport.authenticate("local")(req, res, () => {
         res.status(200).json({ success: "Signup Succesffuly" });
       });
     }
   }
 );
})

router.post('/login', (req,res)=>{

  const user = new User({
  username: req.body.username,
  password: req.body.password,
});
req.login(user, (err) => {
  if (err) {
    console.log(err);
  } else {
    passport.authenticate("local")(req, res, () => {
      res.status(200).json({ success: "Login Successfully" });
    });
  }
});
})

router.get('/logout',  (req,res)=>{
     req.logout(function (err) {
   if (err) {
     return next(err);
   }
   res.redirect("/");
 });
})

router.get("/authenticate", (req, res) => {
  if (req.isAuthenticated()) {
    // res.status(200).json({
    // authenticated: true
    // });
    res.json(req.user);
    console.log("Authenticated");
  } else {
    console.log("Not Authenticated");
  }
});

router.get("/findUser", (req, res) => {
  User.find({}, (err, user) => {
    if (!err) {
      return res.send(user);
    } else {
      console.log(err);
    }
  });
});


module.exports = router;