const fs = require('fs');
const chalk = require('chalk');
const express = require('express'); // function
const app = express();
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const bodyparser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const cloudinary = require('cloudinary')
const session = require('express-session');
const router = require('./controllers/homeofroutes')
const db = require('./models/index.js');
var dbName ='MeImg';
const controllers = require('./controllers/index.js');
const authRoute = require('./controllers/auth.js');
const meimgRoute = require('./controllers/Meimg')






// Configure Handlebars
const hbs = exphbs.create({
  extname: '.hbs',
  
});

// Register Handlebars as view engine
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

// Express body parser
app.use(express.static(__dirname + '/public'));
app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(bodyparser.json());

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    resave: true,
    cookie: { 
      httpOnly:true,
         path: '/',
      sameSite: true,
      secure: false
    }
  })
);


// Passport middleware
//app.use(passport.initialize());
//app.use(passport.session());

// Connect flash
//app.use(flash());

// Global variables
//app.use(function(req, res, next) {
  //res.locals.success_msg = req.flash('success_msg');
  //res.locals.error_msg = req.flash('error_msg');
  //res.locals.error = req.flash('error');
  //next();
//});

//apply auth middleware in application level
//app.use(authRoute.checkIfLoggedIn);

//app.use('/', homeRoutes);
app.use('/', router);
app.use('/authenticate', authRoute);
app.post('/reg',  controllers.UserController.create);

 app.use('/create_MeImg', meimgRoute)





db.connect()
.then(function(){
   console.log('MongoDB Connected........')
// Start the app on pre defined port number
app.listen(PORT, function() {
	console.log("Application has started and running on port: ", PORT);
}).on('error', function(error) {
	console.log("Unable to start app. Error >>>>", error);
});
})
.catch(function(error){
	console.log("failed connection", error);
})