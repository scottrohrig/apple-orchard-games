const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// require Item schema as base
const Item = require('./Item');

// use discriminator to inherit traits from Item
const Masher = Item.discriminator('Masher',
  new mongoose.Schema({
    // add unique Masher properties here
    // no need to add ObjectId, that will be assigned automatically
    name: {
      type: String,
      default: 'Masher'
    }
  })
);

module.exports = Masher;
