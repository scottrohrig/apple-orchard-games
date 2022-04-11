const { Schema } = require('mongoose');

// set up discriminator options, can be any names we choose
const itemOptions = {
    // on query of each item, itemType will appear as a field with the schema name (e.g. juicerSchema)
    discriminatorKey: 'itemType',
    collection: 'items'
};

// create Item schema as parent with shared properties for all items to inherit from
const Item = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    startedAtTime: {
        type: Date
    },
}, itemOptions);

module.exports = Item;