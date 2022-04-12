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
const Orchard = model('Orchard', orchardSchema);

module.exports = treeSchema;