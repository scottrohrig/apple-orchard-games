// require mongoose schema and model
const { Schema, model } = require('mongoose');
const treeSchema = require('./Tree');

const orchardSchema = new Schema(
    {
        trees: [treeSchema]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

orchardSchema.virtual('treeCount').get(function() {
        return this.trees.length;
});

const Orchard = model('Orchard', orchardSchema);

module.exports = Orchard;