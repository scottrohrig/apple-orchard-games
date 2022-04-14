const { Schema } = require('mongoose');
const juicerSchema = require('./Juicer');
const masherSchema = require('./Masher');
const ovenSchema = require('./Oven');

const inventorySchema = new Schema(
    {
        juicers: [juicerSchema],
        ovens: [ovenSchema],
        mashers: [masherSchema]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

module.exports = inventorySchema;