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
    orchard_name: String
    trees: [Tree]
    treeCount: Int
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
    orchard: Orchard
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addOrchard(orchard_name: String): Orchard
    addTree(orchardId: ID!, duration: Int!): Orchard
    addMasher(duration: Int!): User
    addOven(duration: Int!): User
    addJuicer(duration: Int!): User
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
