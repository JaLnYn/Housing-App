const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const favSchema = new Schema({
    house: {
      type: Schema.Types.ObjectId,
      ref: 'House'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  });

module.exports = mongoose.model('Favorite', favSchema);