// require mongoose schema and model
const { Schema, model } = require("mongoose");

const treeSchema = require("./Tree");
const masherSchema = require("./Masher");
const ovenSchema = require("./Oven");
const juicerSchema = require("./Juicer");

// require bcrypt
const bcrypt = require("bcrypt");

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
    tests: {
      type: String,
      required: true,
      default: "default",
    },
    inventoryJSON: {
      type: String,
      required: true,
      default:
        '{"username":"","email":"","password":"","money":0,"appleCount":5,"gemCount":0,"gameVariables":{"initialAppleInventory":5,"applesForNewTree":3,"appleGrowTime":10,"applesGrown":5,"appleSaleRevenue":1,"juicerCost":10,"makeJuiceTime":60,"makeJuiceApplesUsed":2,"juiceSaleRevenue":4,"masherCost":14,"makeSauceTime":120,"makeSauceApplesUsed":4,"sauceSaleRevenue":8,"ovenCost":30,"makePieTime":300,"makePieApplesUsed":8,"pieSaleRevenue":20,"gemPurchaseCost":0.99,"gemsFromPurchase":5},"trees":[{}],"mashers":[],"juicers":[],"ovens":[],"orchards":[{"_id":1,"trees":[]}],"currentOrchard":[]}',
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
