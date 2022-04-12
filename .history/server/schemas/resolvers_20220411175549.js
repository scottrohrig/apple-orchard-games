// require apollo server
const { AuthenticationError } = require('apollo-server-express');
const { coerceInputValue } = require('graphql');
const { Schema } = require('mongoose');
// require necessary models
const { User, Tree } = require('../models');
// require auth
const { signToken } = require('../utils/auth');

// define resolvers
const resolvers = {
  Query: {
    users: async () => {
      return User.find().select('-__v -password').populate('orchards');
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('orchards');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
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
          { $push: { juicers: { duration: args.duration } } },
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
          { $push: { mashers: { duration: args.duration } } },
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
          { $push: { ovens: { duration: args.duration } } },
          { new: true }
        );

        return user;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    addTree: async (parent, args, context) => {
      context.user
      if (context.user) {
        
        const tree =  await Tree.create();
          console.log(tree)
        // const userData = await User.findOneAndUpdate(
        //   { _id: context.user._id },
        //   { $push: { orchards: tree._id } },
        //   { new: true }
        // );

        // console.log(userData);

        // return userData;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    // addOrchard: async (parent, args, context) => {
    //   if (context.user) {
    //     // create a new orchard
    //     const orchard = new Orchard();
    //     // add the new orchard to the User's orchards array
    //     const user = await User.findByIdAndUpdate(
    //       { _id: context.user._id },
    //       { $push: { orchards: orchard._id } },
    //       { new: true }
    //     );

    //     console.log(user);
    //     // return the new orchard
    //     return orchard;
    //   }

    //   throw new AuthenticationError('You need to be logged in!');
    // },

    // updateJuicer
    // need user ID and juicer ID
    // update startedAtTime
    // update duration with upgrades
    updateJuicer: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findByIdAndUpdate(
          { _id: context.user._id },
          {
            $set: {
              juicers: {
                juicerId: args.juicerId,
                startedAtTime: args.startedAtTime,
                duration: args.duration,
              },
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
          { _id: context.user._id },
          {
            $set: {
              mashers: {
                masherId: args.masherId,
                startedAtTime: args.startedAtTime,
                duration: args.duration,
              },
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
          { _id: context.user._id },
          {
            $set: {
              ovens: {
                ovenId: args.ovenId,
                startedAtTime: args.startedAtTime,
                duration: args.duration,
              },
            },
          },
          { new: true }
        );

        return user;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    updateTree: async (parent, args, context) => {
      if (context.user) {
        const orchard = await Orchard.findOneAndUpdate(
          { _id: args.orchardId },
          {
            $set: {
              trees: {
                treeId: args.treeId,
                startedAtTime: args.startedAtTime,
                duration: args.duration,
              },
            },
          },
          { new: true }
        );

        return orchard;
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
