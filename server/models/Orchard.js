// require mongoose schema and model
const { Schema, model } = require('mongoose');

const orchardSchema = new Schema(
    {
        trees: {
            type: Number,
            min: 0
        }
    }
);

const Orchard = new Model('Orchard', orchardSchema);

module.exports = Orchard;