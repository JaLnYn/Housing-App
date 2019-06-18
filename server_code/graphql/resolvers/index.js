const authResolver = require('./auth');
const userResolver = require('./user');
const houseResolver = require('./house');
const favoriteResolver = require('./favorite')



const rootResolver = {
  ...authResolver,
  ...userResolver,
  ...houseResolver,
  ...favoriteResolver
};

module.exports = rootResolver;
