const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 3,
        required: true
    },
    description: {
        type: String,
        minlength: 3,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    inventory: {
        type: Number,
        min: 0,
        required: true
    }
});

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;