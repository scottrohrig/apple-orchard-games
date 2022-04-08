// require mongoose schema and model
const { Schema, model } = require('mongoose');

const Orchard = require('./Orchard');
const treeSchema = require('./Tree');
const masherSchema = require('./Masher');
const ovenSchema = require('./Oven');
const juicerSchema = require('./Juicer');

// require bcrypt
const bcrypt = require('bcrypt');

// define schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must enter valid email address!']
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    // money will reflect the user score
    money: {
        type: Number,
        min: 0
    },
    appleCount: {
        type: Number,
        min: 0
    },
    gemCount: {
        type: Number,
        min: 0
    },
    orchard: [{
        type: Schema.Types.ObjectId,
        ref: 'Orchard'
    }],
    juicers: [juicerSchema],
    mashers: [masherSchema],
    ovens: [ovenSchema],
    trees: [treeSchema]
})

// pre-save middleware for password
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
});

// schema methods
// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

// schema virtuals

// define model
const User = model('User', userSchema);
// modularize model
module.exports = User;
