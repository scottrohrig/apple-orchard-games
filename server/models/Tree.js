const { Schema } = require('mongoose');

const treeSchema = new Schema({
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

module.exports = treeSchema;
