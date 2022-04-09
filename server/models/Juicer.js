const { Schema } = require('mongoose');

const juicerSchema = new Schema(
  {
    startedAtTime: {
      type: Date,
      default: Date.now
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