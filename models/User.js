const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    fullname: {
        type: String,
        required: true
        
    },

    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    password: {
    type: String,
    required: true
   },
createdAt:{
    type: Date,
    default:(new Date())
}
},
{
collection : 'users'
});
const User = mongoose.model('User', userSchema);

module.exports = User;


