const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');

// Models
const User = require('./database/models/user');
const Item = require('./database/models/item');
const PulledItem = require('./database/models/pulled-item');

// CORS Fix
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// JSON Parser
app.use(express.json());


////////// Routes //////////
// Get ALL Cart Items
app.get('/users/:userId/cart', (req, res) => {
    PulledItem.find({ '_userId': req.params.userId })
        .then(items => res.send(items))
        .catch((error) => console.log(error));
});
// Add New Item to Cart
app.post('/users/:userId/cart', (req, res) => {
    (new PulledItem({ 
        '_itemId': req.body.itemId,
        '_userId': req.params.userId,
        'count': req.body.count
     }))
        .save()
        .then((item) => res.send(item))
        .catch((error) => console.log(error));
});
// Get Single Cart Item
app.get('/users/:userId/cart/:pulledItemId', (req, res) => {
    PulledItem.findOne({ '_id': req.params.pulledItemId })
        .then((item) => res.send(item))
        .catch((error) => console.log(error));

});
// Update Single Cart Item (Add count or deminish count)
app.patch('/users/:userId/cart/:pulledItemId', (req, res) => {
    PulledItem.findOneAndUpdate({'_id': req.params.pulledItemId}, { $set: req.body })
        .then((item) => res.send(item))
        .catch((error) => console.log(error));
});
// Delete Single Cart Item
app.delete('/users/:userId/cart/:pulledItemId', (req, res) => {
    PulledItem.findOneAndDelete({'_id': req.params.pulledItemId})
        .then((item) => res.send(item))
        .catch((error) => console.log(error));
});


// Get All Items
app.get('/items', (req, res) => {
    Item.find({})
        .then(items => res.send(items))
        .catch((error) => console.log(error));
});
/// ADMIN - Create An Item
app.post('/items', (req, res) => {
    (new Item({ 
        'name': req.body.name, 
        'description': req.body.description,
        'price': req.body.price,
        'inventory': req.body.inventory 
    }))
        .save()
        .then((item) => res.send(item))
        .catch((error) => console.log(error));
});
// Get Single Item
app.get('/items/:itemId', (req, res) => {
    Item.findOne({' _id': req.params.itemId })
        .then((item) => res.send(item))
        .catch((error) => console.log(error));
});
/// ADMIN - Update Single Item
app.patch('/items/:itemId', (req, res) => {
    Item.findOneAndUpdate({ '_id': req.params.itemId }, { $set: req.body })
        .then((item) => res.send(item))
        .catch((error) => console.log(error));
});
/// ADMIN - Delete Single Item
app.delete('/items/:itemId', (req, res) => {
    Item.findOneAndDelete({ '_id': req.params.itemId })
        .then((item) => res.send(item))
        .catch((error) => console.log(error));
});

//// GET ALL USERS (Utility)
app.get('/users', (req, res) => {
    User.find({})
        .then(users => res.send(users))
        .catch((error) => console.log(error));
});
// Create User
app.post('/users', (req, res) => {
    (new User({ 'email': req.body.email, 'password': req.body.password }))
        .save()
        .then((user) => res.send(user))
        .catch((error) => console.log(error));
});
// Get Single User
app.get('/users/:userId', (req, res) => {
    User.findOne({ '_id': req.params.userId })
        .then((user) => res.send(user))
        .catch((error) => console.log(error));
});
// Update User
app.patch('/users/:userId', (req, res) => {
    User.findOneAndUpdate({ '_id': req.params.userId }, { $set: req.body })
        .then((user) => res.send(user))
        .catch((error) => console.log(error));
});
// Delete User
app.delete('/users/:userId', (req, res) => {
    User.findOneAndDelete({ '_id': req.params.userId })
        .then((user) => res.send(user))
        .catch((error) => console.log(error));
});






//Server
app.listen(3000, () => console.log("server Connected on port 3000"));