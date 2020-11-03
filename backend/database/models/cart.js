const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    items: Object
});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;