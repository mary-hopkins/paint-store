const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        minlength: 3,
        required: true
    },
    password: {
        type: String,
        minlength: 3,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;