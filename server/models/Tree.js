const { Schema } = require('mongoose');

const treeSchema = new Schema({
  startedAtTime: {
    type: Date,
  },
  duration: {
    type: Number,
    min: 0,
    default: 30
  },
  isReady: {
    type: Boolean,
  },
});

module.exports = treeSchema;
