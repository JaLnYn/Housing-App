const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const houseSchema = new Schema({
    forRent:{
        type: Boolean,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    aptNum:{
        type: Number,
        required: true
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    lng: {
        type: Number,
        require: true
    },
    lat: {
        type: Number,
        require: true
    },
    discription:{
        type: String,
        required: true
    },
    pics: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Picture'
        }
    ]
});

module.exports = mongoose.model('House', houseSchema);