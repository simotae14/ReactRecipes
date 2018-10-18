const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// import bcrypt
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    joinDate: {
        type: Date,
        default: Date.now
    },
    favorites: {
        type: [Schema.Types.ObjectId],
        ref: 'Recipe'
    }
});

// function to transform pwd in hash before save it
UserSchema.pre('save', function(next) {
    // if the password isn't modified
    if (!this.isModified('password')) {
        return next();
    }
    // elsewhere create the hash
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        // generate hash
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            // set password
            this.password = hash;
            // next function
            next();
        });
    });
});

module.exports = mongoose.model('User', UserSchema);