// require mongoose schema and model
const { Schema, model } = require("mongoose");

const treeSchema = require("./Tree");
const masherSchema = require("./Masher");
const ovenSchema = require("./Oven");

// require bcrypt
const bcrypt = require("bcrypt");
const juicerSchema = require("./Juicer");

// define schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must enter valid email address!"],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    // money will reflect the user score
    money: {
      type: Number,
      default: 0,
      min: 0,
    },
    appleCount: {
      type: Number,
      default: 5,
      min: 0,
    },
    gemCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    trees: [treeSchema],
    juicers: [juicerSchema],
    mashers: [masherSchema],
    ovens: [ovenSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// pre-save middleware for password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// schema methods
// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// schema virtuals
userSchema.virtual("juicerCount").get(function () {
  return this.juicers.length;
});

userSchema.virtual("masherCount").get(function () {
  return this.mashers.length;
});

userSchema.virtual("ovenCount").get(function () {
  return this.ovens.length;
});

// define model
const User = model("User", userSchema);
// modularize model
module.exports = User;
