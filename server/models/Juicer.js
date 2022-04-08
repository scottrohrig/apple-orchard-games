const { Schema } = require('mongoose');

const juicerSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  startedAtTime: {
    type: Date,
  },
});

module.exports = juicerSchema;
