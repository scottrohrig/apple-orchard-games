// require mongoose schema and model
const { Schema, model } = require('mongoose');
const { Tree } = require('./Tree').schema;

const orchardSchema = new Schema(
    {
        trees: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Tree'
            }
        ]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Orchard = model('Orchard', orchardSchema);

module.exports = Orchard;