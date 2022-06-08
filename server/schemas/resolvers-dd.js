// require apollo server
const { AuthenticationError } = require("apollo-server-express");
// require necessary models
const { User } = require("../models");
// require auth
const { signToken } = require("../utils/auth");

// define resolvers
const resolvers = {
  Query: {
    users: async () => {
      return User.find().select("-__v -password").sort({ money: -1 });
    },
    me: async (_, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
  },

  Mutation: {
    addUser: async (_, args) => {
      // create new user in db w/ args passed in
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },

    addJuicer: async (_, args, context) => {
      if (context.user) {
        const user = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { juicers: args } },
          { new: true }
        );

        return user;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    addMasher: async (_, args, context) => {
      console.log("\n\n add masher", args);
      if (context.user) {
        const user = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { mashers: args } },
          { new: true }
        );

        return user;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    addOven: async (_, args, context) => {
      if (context.user) {
        const user = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { ovens: args } },
          { new: true }
        );

        return user;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    addTree: async (_, args, context) => {
      if (context.user) {
        const user = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { trees: args } },
          { new: true }
        );

        return user;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    // addTreeArray IS USED FOR TESTING
    addTreeArray: async (_, args, context) => {
      // if (context.user) {
      console.log("************* addTreeArray - here is args:");
      console.log(args);
      const user = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $push: { mashers: args }, $set: { tests: args.tests } },

        { new: true }
      );

      return user;
      // }

      // throw new AuthenticationError("You need to be logged in!");
    },

    updateJuicer: async (_, args, context) => {
      console.log("update Juicer");
      console.log(args);
      if (context.user) {
        const query = { _id: context.user._id, "juicers._id": args.juicerId };
        const updateDocument = {
          "juicers.$.startedAtTime": args.startedAtTime,
          "juicers.$.duration": args.duration,
        };
        const options = { arrayFilters: [{ "juicers.$": 0 }] };
        const user = await User.updateOne(query, updateDocument, options);

        return user;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    updateMasher: async (_, args, context) => {
      if (context.user) {
        const query = { _id: context.user._id, "mashers._id": args.masherId };
        const updateDocument = {
          "mashers.$.startedAtTime": args.startedAtTime,
          "mashers.$.duration": args.duration,
        };
        const options = { arrayFilters: [{ "mashers.$": 0 }] };
        const user = await User.updateOne(query, updateDocument, options);

        return user;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    updateOven: async (_, args, context) => {
      if (context.user) {
        const query = { _id: context.user._id, "ovens._id": args.ovenId };
        const updateDocument = {
          "ovens.$.startedAtTime": args.startedAtTime,
          "ovens.$.duration": args.duration,
        };
        const options = { arrayFilters: [{ "ovens.$": 0 }] };
        const user = await User.updateOne(query, updateDocument, options);

        return user;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    updateTree: async (_, args, context) => {
      if (context.user) {
        const query = { _id: context.user._id, "trees._id": args.treeId };
        const updateDocument = {
          "trees.$.startedAtTime": args.startedAtTime,
          "trees.$.duration": args.duration,
        };
        const options = { arrayFilters: [{ "trees.$": 0 }] };
        const user = await User.updateOne(query, updateDocument, options);

        return user;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    // updateUser
    // find user by id
    // update either gemCount, appleCount, money OR user info like username or email
    updateUser: async (_, args, context) => {
      console.log("update user");
      console.log(args);
      if (context.user) {
        const user = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $set: args },
          { new: true }
        );

        return user;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    // removeUser
    // find by userId and remove
    // log user out after removing

    // resetUserStats:
    resetUserStats: async (_, args, context) => {
      if (context.user._id) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: args },
          // {
          //   $pullAll: {
          //     trees: { _id: { $gte: 0 } }
          //   }
          // },
          { new: true }
        );

        return user;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

// modularize resolvers
module.exports = resolvers;
