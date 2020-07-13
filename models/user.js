const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        trim: true,
        required: true,
        maxlength: 20,
        unique: true,
        index: true,
        lowerCase: true
    },
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 20
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        maxLength: 20
    },
    profile: {
        type: String,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: Number,
    about: {
        type: String
    },
    role: {
        type: Number,
        trim: true,
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    resetPasswordLink: {
        data: String,
        default: ''
    }
}, {timestamp: true})

module.exports = mongoose.model('User', userSchema)