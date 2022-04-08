const { Schema } = require('mongoose');
// require Item schema as base
const Item = require('./Item');

// use discriminator to inherit traits from Item
const Tree = Item.discriminator('Tree',
  new Schema({
    // add unique Tree properties here
    // no need to add ObjectId, that will be assigned automatically
    name: {
      type: String,
      default: 'Tree'
    }
  })
);

module.exports = Tree;
