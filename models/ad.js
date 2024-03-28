const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title:String,
    photo:String,
    description:String,
    price:String,
    city:String,
    country:String
});

module.exports = mongoose.model('ad',adSchema);