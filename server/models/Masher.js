const { Schema } = require('mongoose');

const masherSchema = new Schema({
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

module.exports = masherSchema;
