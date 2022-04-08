const { Schema } = require('mongoose');

const treeSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  startedAtTime: {
    type: Date,
  },
});

module.exports = treeSchema;
