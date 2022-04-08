const { Schema } = require('mongoose');
// require Item schema as base
const Item = require('./Item');

// use discriminator to inherit traits from Item
const Juicer = Item.discriminator('Juicer',
  new Schema({
    // add unique Juicer properties here
    // no need to add ObjectId, that will be assigned automatically
    name: {
      type: String,
      default: 'Juicer'
    }
  })
);

module.exports = Juicer;
