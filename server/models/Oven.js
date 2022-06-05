const { Schema } = require('mongoose');

const ovenSchema = new Schema(
  {
    startedAtTime: {
      type: Date,
      default: new Date()
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
  });

module.exports = ovenSchema;

