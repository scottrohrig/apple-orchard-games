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
    trees: [Tree]
    juicers: [Juicer]
    mashers: [Masher]
    ovens: [Oven]
    juicerCount: Int
    masherCount: Int
    ovenCount: Int
  }

  scalar Date



  type Tree {
    _id: ID
    startedAtTime: Date
    duration: Int
  }

  type Juicer {
    _id: ID
    startedAtTime: Date
    duration: Int
  }

  type Masher {
    _id: ID
    startedAtTime: Date
    duration: Int
  }

  type Oven {
    _id: ID
    startedAtTime: Date
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
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addTree(  duration: Int): User
    addJuicer(duration: Int): User
    addMasher(duration: Int): User
    addOven(  duration: Int): User
    updateUser(username: String, email: String, password: String, gemCount: Int, appleCount: Int, money: Int): User
    updateTree(    treeId: ID!, startedAtTime: Date!, duration: Int): User
    updateJuicer(juicerId: ID!, startedAtTime: Date!, duration: Int): User
    updateMasher(masherId: ID!, startedAtTime: Date!, duration: Int): User
    updateOven(    ovenId: ID!, startedAtTime: Date!, duration: Int): User
    removeUser: User
    resetUserStats(money: Int, appleCount: Int): User
  }
`;

// modularize typeDefs
module.exports = typeDefs;
