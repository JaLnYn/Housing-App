const DataLoader = require('dataloader');

const House = require('../../models/houseInfo');
const User = require('../../models/user');


const houseLoader = new DataLoader(houseId => {
    return houses(houseId);
});

const userLoader = new DataLoader(userIds => {
  return User.find({ _id: { $in: userIds } });
});

const houses = async houseIds => {
  try {

    const houses = await House.find({ _id: { $in: houseIds } });
    houses.sort((a, b) => {
      return (
        houseIds.indexOf(a._id.toString()) - houseIds.indexOf(b._id.toString())
      );
    });
    return houses.map(houses => {
      return transformHouse(houses);
    });
  } catch (err) {
      
    throw err;
  }
};

const singleHouse = async houseID => {
  try {
    const house = await houseLoader.load(houseID);
    return house;
  } catch (err) {
    throw err;
  }
};

const userTransform = async userId => {
  try {
    
    const user = await userLoader.load(userId.toString());
    return {
      ...user._doc,
      _id: user.id,
      password: null,
      myHouse: () => houseLoader.loadMany(user._doc.myHouse)
    };
  } catch (err) {
    throw err;
  }
};

const transformUser = async user => {
    try {
      return {
        ...user._doc,
        _id: user.id,
        password: null,
        myHouse: () => houseLoader.loadMany(user._doc.myHouse)
      };
    } catch (err) {
      throw err;
    }
  };

const transformHouse = house => {
  return {
    ...house._doc,
    _id: house.id,
    creator: userTransform.bind(this, house.owner)
  };
};

const transformFavorite = favorite => {
  return {
    ...favorite._doc,
    _id: favorite.id,
    user: userTransform.bind(this, favorite._doc.user),
    house: singleHouse.bind(this, favorite._doc.house)
  };
};
exports.userTransform = userTransform
exports.transformUser = transformUser
exports.transformHouse = transformHouse;
exports.transformFavorite = transformFavorite;
