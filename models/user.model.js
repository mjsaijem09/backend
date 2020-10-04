const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
});


mongoose.model('User', userSchema);