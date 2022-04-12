// import gql
const { gql } = require('apollo-server-express');

// define typeDefs
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    money: Int
    appleCount: Int
    gemCount: Int
    orchards: [Tree]
    juicers: [Juicer]
    mashers: [Masher]
    ovens: [Oven]
    treeCount: Int
    juicerCount: Int
    masherCount: Int
    ovenCount: Int
  }


  type Orchard {
    _id: ID
    trees: [Tree]
    treeCount: Int
  }

  type Tree {
    _id: ID
    duration: Int
    date: String
  }

  type Juicer {
    _id: ID
    startedAtTime: String
    duration: Int
  }

  type Masher {
    _id: ID
    duration: Int
  }

  type Oven {
    _id: ID
    duration: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    orchards(username: String!): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addTree(duration: Int! ): User
    addMasher(duration: Int!): User
    addOven(duration: Int!): User
    addJuicer(duration: Int!): User
    updateUser(
      username: String
      email: String
      password: String
      gemCount: Int
      appleCount: Int
      money: Int
    ): User
 
    removeUser: User
  }
`;

// modularize typeDefs
module.exports = typeDefs;
