const { Schema } = require('mongoose');
// require Item schema as base
const Item = require('./Item');

// use discriminator to inherit traits from Item
const treeSchema = Item.discriminator(
  new Schema({
    // add unique Tree properties here
    // no need to add ObjectId, that will be assigned automatically
    name: {
      type: String,
      default: 'Tree'
    }
  })
);

module.exports = treeSchema;
