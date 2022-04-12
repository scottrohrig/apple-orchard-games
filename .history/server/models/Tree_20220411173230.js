const { Schema, model } = require('mongoose');

const treeSchema = new Schema({
  startedAtTime: {
    type: Date,
    default: Date.now()
  },
  duration: {
    type: Number,
    min: 0,
    default: 30,
  },
  isReady: {
    type: Boolean,
  },
});
const Tree = model('Tree', treeSchema);

module.exports = Tree;