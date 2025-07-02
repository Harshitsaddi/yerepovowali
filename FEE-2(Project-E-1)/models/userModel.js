const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/movie-booking');

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    bookedSeats: {
        type: Array,
        default: []
    }, 
    city:{
        type: String,
        default: ""
},
    theatre: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model('user', userSchema);