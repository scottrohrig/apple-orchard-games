const { Schema } = require('mongoose');

const juicerSchema = new Schema({
  startedAtTime: {
    type: Date,
  },
  duration: {
    type: Number,
    min: 0,
  },
  isReady: {
    type: Boolean,
  },
});

module.exports = juicerSchema;
