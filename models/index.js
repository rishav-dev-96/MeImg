const User = require('./User.js');
const mongoose = require('mongoose');
const db = require('../config/keys').MongoURI;
const MeImg = require('./meimg.js')
function connect(){
    return mongoose.connect(db,{
        useNewUrlParser: true
    });
}
 module.exports ={
     models:{
        user: User,
        meimg: MeImg
    },
         connect: connect
     };
     // connecting to mongo
//mongoose.connect(db, {
	 //useNewUrlParser: true
	// })
//  .then(() => console.log('MongoDB Connected........'))
 //.catch(err => console.log(err));