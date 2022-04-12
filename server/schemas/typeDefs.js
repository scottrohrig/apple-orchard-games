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
    orchardId: [String]
    juicers: [Juicer]
    mashers: [Masher]
    ovens: [Oven]
    juicerCount: Int
    masherCount: Int
    ovenCount: Int
  }

  scalar Date

  type Orchard {
    _id: ID
    orchard_name: String
    trees: [Tree]
    treeCount: Int
  }

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
    orchard(_id: ID!): Orchard
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addOrchard(orchard_name: String): Orchard
    addTree(orchardId: ID!): Orchard
    addMasher: User
    addOven: User
    addJuicer(duration: Int): User
    updateUser(username: String, email: String, password: String, gemCount: Int, appleCount: Int, money: Int): User
    updateTree(orchardId: ID!, treeId: ID!, startedAtTime: Date!, duration: Int): Orchard
    updateMasher(masherId: ID!, startedAtTime: Date!, duration: Int): User
    updateOven(ovenId: ID!, startedAtTime: Date!, duration: Int): User
    updateJuicer(juicerId: ID!, startedAtTime: Date!, duration: Int): User
    removeUser: User
  }
`;

// modularize typeDefs
module.exports = typeDefs;
