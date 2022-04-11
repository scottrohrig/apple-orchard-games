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
    orchards: [Orchard]
    trees: [Tree]
    juicers: [Juicer]
    mashers: [Masher]
    ovens: [Oven]
    treeCount: Int
    juicerCount: Int
    masherCount: Int
    ovenCount: Int
  }

  scalar Date

  type Orchard {
    _id: ID
    trees: [Tree]
  }

  type Tree {
    _id: ID
    duration: Int
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
    orchards(username: String!): [Orchard]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addOrchard(userId: ID!): User
    addTree(duration: Int!): User
    addMasher(duration: Int!): User
    addOven(duration: Int!): User
    addJuicer(duration: Int!): User
    updateUser(username: String, email: String, password: String, gemCount: Int, appleCount: Int, money: Int): User
    updateOrchard(orchardId: ID!): User
    updateTree(treeId: ID!, startedAtTime: Date!, duration: Int): User
    updateMasher(masherId: ID!, startedAtTime: Date!, duration: Int): User
    updateOven(ovenId: ID!, startedAtTime: Date!, duration: Int): User
    updateJuicer(juicerId: ID!, startedAtTime: Date!, duration: Int): User
    removeUser(userId: ID!): User
  }
`;

// modularize typeDefs
module.exports = typeDefs;
