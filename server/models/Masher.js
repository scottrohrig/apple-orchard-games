const { Schema } = require('mongoose');

const masherSchema = new Schema(
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

module.exports = masherSchema;
