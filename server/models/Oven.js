const { Schema } = require('mongoose');

const ovenSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  startedAtTime: {
    type: Date,
  },
});

module.exports = ovenSchema;
