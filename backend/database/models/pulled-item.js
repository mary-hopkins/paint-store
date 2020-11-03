const mongoose = require('mongoose');

const PulledItemSchema = new mongoose.Schema({
    _itemId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    count: {
        type: Number,
        min: 0,
        required: true
    }
});

const PulledItem = mongoose.model('PulledItem', PulledItemSchema);
module.exports = PulledItem;