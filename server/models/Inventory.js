const { Schema } = require('mongoose');

const inventorySchema = new Schema(
    {
        juicers: [Juicer],
        ovens: [Oven],
        mashers: [Masher]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

module.exports = inventorySchema;