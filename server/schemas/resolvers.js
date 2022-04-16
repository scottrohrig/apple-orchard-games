// require apollo server
const { AuthenticationError } = require('apollo-server-express');
// require necessary models
const { User } = require('../models');
// require auth
const { signToken } = require('../utils/auth');

// define resolvers
const resolvers = {
  Query: {
    users: async () => {
      return User.find().select('-__v -password').sort({ money: -1 });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          '-__v -password'
        );

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    trees: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({_id: context.user._id})
          console.log('TREES userData:',userData);
          return userData?.trees || [{_id: '', startedAtTime: new Date(), duration: 10}]
      }
    }

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

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    addJuicer: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { juicers: args } },
          { new: true }
        );

        return user;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    addMasher: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { mashers: args } },
          { new: true }
        );

        return user;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    addOven: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { ovens: args } },
          { new: true }
        );

        return user;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    addTree: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { trees: args } },
          { new: true }
        );

        return user;
      }

      throw new AuthenticationError('You need to be logged in!');
    },




    // updateJuicer
    // need user ID and juicer ID
    // update startedAtTime
    // update duration with upgrades
    updateJuicer: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findByIdAndUpdate(
          { _id: context.user._id, juicers: { $elemMatch: { juicerId: args.juicerId } } },
          {
            $set: {
              'juicers.$[].startedAtTime': args.startedAtTime,
              'juicers.$[].duration': args.duration,
            },
          },
          { new: true }
        );

        return user;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    updateMasher: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findByIdAndUpdate(
          { _id: context.user._id, mashers: { $elemMatch: { masherId: args.masherId } } },
          {
            $set: {
              'mashers.$[].startedAtTime': args.startedAtTime,
              'mashers.$[].duration': args.duration,
            },
          },
          { new: true }
        );

        return user;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    updateOven: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findByIdAndUpdate(
          { _id: context.user._id, ovens: { $elemMatch: { ovenId: args.ovenId } } },
          {
            $set: {
              'ovens.$[].startedAtTime': args.startedAtTime,
              'ovens.$[].duration': args.duration,
            },
          },
          { new: true }
        );

        return user;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    // attempt to update the tree.
    updateTree: async (parent, args, context) => {
      console.log('n\n\UPDATE TREE>>>', args);
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id, trees: {$elemMatch: {treeId: args.treeId}} },
          {
            $set: {
              'trees.$[].startedAtTime': args.startedAtTime,
              'trees.$[].duration': args.duration,
            },
          },
          { new: true }
        );

        return user;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    // updateUser
    // find user by id
    // update either gemCount, appleCount, money OR user info like username or email
    updateUser: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $set: args },
          { new: true }
        );

        return user;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    // removeUser
    // find by userId and remove
    // log user out after removing
  },
};

// modularize resolvers
module.exports = resolvers;
