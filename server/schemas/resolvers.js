// require apollo server
const { AuthenticationError } = require('apollo-server-express');
// require necessary models
const { User } = require('../models');
// require auth
const { signToken } = require('../utils/auth');

// define resolvers
const resolvers = {

};

// modularize resolvers
module.exports = resolvers;