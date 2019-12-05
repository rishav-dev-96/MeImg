const User = require('./../models/User.js');
const express = require('express');
var router = express.Router();




router.post ('/',function(req,res){
    var email = req.body.email;
    var password = req.body.password;
    console.log("email", email)
    console.log("password", password)

    User.findOne({email: email, password: password}, function(err, user){

        if (err)
            throw err;
            console.log("err", err)
        if (user) {
            console.log("user", user)
            req.session.loggedIn = true;
            req.session.user = user.email;
        } else {
            req.session.loggedIn = false;
        }
        if (!req.session.loggedIn) {
            res.redirect('/login')
            
        } else {
            req.session.user = user;
            req.session.loggedIn = true;
            req.session.loggedOut = false;
            res.redirect('/create_MeImg');
        }
    });
});



// AuthController.checkIfLoggedIn = function(req, res, next){
//   console.log("check session", req.session.user);
//     console.log("url>>>>>", req.originalUrl);

//     if(typeof(req.session.user) === "Undefined"){
//       return res.redirect('/');
//     } else{
//         return next();
//         }
//     }

module.exports = router;
