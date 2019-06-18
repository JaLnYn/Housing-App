const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const pictureSchema = new Schema({
    discription:{
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Picture', pictureSchema);