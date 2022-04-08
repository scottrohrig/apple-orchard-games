// require mongoose schema and model
const { Schema, model } = require('mongoose');
const treeSchema = require('./Tree');

const orchardSchema = new Schema(
    {
        trees: [treeSchema]
    }
);

const Orchard = model('Orchard', orchardSchema);

module.exports = Orchard;