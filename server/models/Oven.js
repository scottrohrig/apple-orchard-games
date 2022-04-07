const { Schema } = require('mongoose');
// require Item schema as base
const Item = require('./Item');

// use discriminator to inherit traits from Item
const ovenSchema = Item.discriminator(
  new Schema({
    // add unique Oven properties here
    // no need to add ObjectId, that will be assigned automatically
    name: {
      type: String,
      default: 'Oven'
    }
  })
);

module.exports = ovenSchema;
