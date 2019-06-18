
const House = require('../../models/houseInfo');
const User = require('../../models/user');
const { transformHouse, transformUser} = require('./merge');


module.exports = {
    createHouse: async (args, req) => {
        if (!req.isAuth) {
          throw new Error('Unauthenticated!');
        }
        let house = new House({
            forRent: args.houseInput.forRent,
            address: args.houseInput.address,
            aptNum: args.houseInput.aptNum,
            price: args.houseInput.price,
            owner: req.userId,
            lng: args.houseInput.lng,
            lat: args.houseInput.lat,
            discription: args.houseInput.discription,
        });
        //let createdHouse;
        try {
          const owner = await User.findById(req.userId);
    
          if (!owner) {
            throw new Error('User not found.');
            return
          }
          result = await house.save();
          createdHouse = transformHouse(result);
          owner.myHouse.push(house);
          await owner.save();
        

          return transformUser(owner);
        } catch (err) {
          console.log(err);
          throw err;
        }
    },
    
};