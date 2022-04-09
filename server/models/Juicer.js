const { Schema } = require('mongoose');
// require Item schema as base
const Item = require('./Item');

const juicerSchema = new Schema(
  {
    startedAtTime: {
      type: Date,
    },
    duration: {
      type: Number,
      min: 0,
    },
    isReady: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

module.exports = juicerSchema;
