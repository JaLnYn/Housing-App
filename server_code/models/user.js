const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    bio: {
        type: String,
        require: true
    },
    isTenant:{
        type: Boolean,
        required: true
    },
    myHouse:[{
        type: Schema.Types.ObjectId,
        ref: 'House'
    }],

});

module.exports = mongoose.model('User', userSchema);