const House = require('../../models/houseInfo');
const Favorite = require('../../models/favorites');
const { transformFavorite , transformHouse} = require('./merge');


module.exports = {
  myFavorites: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const fav = await Favorite.find({user: req.userId});
      return fav.map(fav => {
        return transformBooking(fav);
      });
    } catch (err) {
      throw err;
    }
  },
  addFavorite: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    const fetchedHouse = await House.findOne({ _id: args.houseId });
    if(!fetchedHouse){
      throw new Error('cannot find house')
    }
    const fav = new Favorite({
      user: req.userId,
      house: fetchedHouse
    });
    const result = await fav.save();
    return transformFavorite(result);
  },
  removeFavorite: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const favorite = await Favorite.findById(args.favoriteId).populate('favorite');
      if(!favorite){
        throw new Error('This Favorite does not exist!');
      }
      if(favorite._doc.user != req.userId){
        throw new Error('You are Unauthorized to delete this!')
      }
      const house = await House.findById(favorite.house);
      
      await Favorite.deleteOne({ _id: args.favoriteId });

      return transformHouse(house)  ;
    } catch (err) {
      throw err;
    }
  }
};