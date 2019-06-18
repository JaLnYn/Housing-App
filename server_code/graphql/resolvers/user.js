const User = require('../../models/user');
const { userTransform, transformUser } = require('./merge');


module.exports = {
    oneUser: async (args, req) => {
        
        try {
            return userTransform(args.userId);
        } catch (err) {            
          throw err;
        }
    },
    changeUserTeanentStatus: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        try {
            const user = await User.findById(req.userId);
            if(!user){
                throw new Error('Could not find user')
            }

            user.isTenant = args.isTenant;
            
            await user.save();
            return transformUser(user);
        } catch (err) {  
            throw err;
        };
    },
    updateUserProfile: async (args,req) =>{
        
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        try {
            const user = await User.findById(req.userId);
            if(!user){
                throw new Error('Could not find user')
            }
            if(args.bio.length < 200){
                user.bio = args.bio;
                await user.save();
            }
            return transformUser(user);
        } catch (err) {            
          throw err;
        };
    }
};