const { Schema, model } = require('mongoose');

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

// const Juicer = model('Juicer', juicerSchema);

module.exports = juicerSchema;
