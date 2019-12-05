const express = require('express');
var router = express.Router();

//routing
router.get('/',function(req,res){
    res.redirect('/signup')
});


router.get('/about', function (req, res) {
    res.render('about',{
        title: '',
        stylesheet: 'about.css'
    })
});

router.get('/contact',function(req,res){
    res.render('contact',{
        title: '',
        stylesheet: 'contact.css'
    });
});

router.get('/signup', function (req,res) {
    res.render('signup',{
        title: 'Meimg - signup',
        stylesheet: 'signup.css'
    })
});

router.get('/login', function (req,res) {
    res.render('login',{
        title: 'MeImg - login',
        stylesheet: 'loginsheet.css'
    })
});

// Logout
// Logout
router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;