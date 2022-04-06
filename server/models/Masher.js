const { Schema } = require('mongoose');

const masherSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  startedAtTime: {
    type: Date,
  },
});

module.exports = masherSchema;
