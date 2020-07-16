const mongoose = require('mongoose');
const crypto = require('crypto');
const { set } = require('lodash');

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
    }, {timestamp: true}
);

userSchema.virtual('password')
    .set(function(password) {
        this._password = password
        this.salt = this.makeSalt()
        this.hashed_password = this.encryptPassword(password)

    })
    .get(function() {
        return this._password;
    });
    
userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },

    encryptPassword: function(password) {
        if(!password) return ''
        try {
            return crypto.createHmac('sha1', this.salt)
                            .update(password)
                            .digest('hex');
        } catch (err) {
            return ''
        }
    },

    makeSalt: function() {
        return Math.round(new Date().valueOf() + Math.random()) + '';
    }
};

module.exports = mongoose.model('User', userSchema);