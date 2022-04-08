// require apollo server
const { AuthenticationError } = require('apollo-server-express');
// require necessary models
const { User, Juicer } = require('../models');
// const juicerSchema = require('../models/Juicer');
// require auth
const { signToken } = require('../utils/auth');

// define resolvers
const resolvers = {
    Query: {
        users: async () => {
            return User.find()
                .select('-__v -password')
        },
    },

    Mutation: {
        addUser: async (parent, args) => {
            // create new user in db w/ args passed in
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if(!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },

        addJuicer: async (parent, args, context) => {
            
            if (context.user) {
                const juicer = await Juicer.create({ ...args, duration: 30 });

                const user = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { juicers: juicer._id } },
                    { new: true }
                )
    
                return user;
            }

            throw new AuthenticationError('You need to be logged in!');
        }
    }

};

// modularize resolvers
module.exports = resolvers;