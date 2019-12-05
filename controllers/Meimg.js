const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const MeImg = require("../models/meimg.js")

const upload = require('./multer');

require("./cloudinary.js")
const cloudinary = require('cloudinary').v2




router.post('/', upload.single('myImage'), async (req, res) => {

    if (!req.session.loggedIn) {
        req.redirect('/login');
    } else {

        insertRecord(req, res);
    }


});

async function insertRecord(req, res) {
    req.body.email = req.session.user.email;
    req.body.mobile = req.session.user.mobile;
    let result;
    try {
        result = await cloudinary.uploader.upload(req.file.path)
    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
console.log(result)
    var event = new MeImg();

    event.title = req.body.title;
    event.imageUrl = result.url;
    event.save((err, event) => {
        if (!err)
            res.redirect('/create_MeImg');
        else {
            console.log('error during record isertion :' + err);
            res.status(500).send('Error connecting to database.');
        }
    });
};

router.get('/', async (req, res) => {
    
        try {
            
            
           docs = await MeImg.find({}).sort({})
                
    
    
            res.render("home", {
                meimg: docs,
                title: 'MeImg - home',
                style: 'home.css',
                user: req.session.loggedIn
            });
        } catch (error) {
            console.log('Error in retrieving event list :' + error);
        }
})




module.exports = router;