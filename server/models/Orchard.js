// require mongoose schema and model
const { Schema, Model } = require('mongoose');
const treeSchema = require('./Tree');

const orchardSchema = new Schema(
    {
        trees: [treeSchema]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Orchard = new Model('Orchard', orchardSchema);

module.exports = Orchard;