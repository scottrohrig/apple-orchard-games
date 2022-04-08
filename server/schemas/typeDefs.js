// import gql
const { gql } = require('apollo-server-express');

// define typeDefs
const typeDefs = gql `
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
    }

    type Orchard {
        _id: ID
        trees: [Tree]
    }

    type Tree {
        _id: ID
    }

    type Juicer {
        _id: ID
        duration: Int
    }

    type Masher {
        _id: ID
    }

    type Oven {
        _id: ID
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
        trees(username: String!): User
        mashers(username: String!): User
        ovens(username: String!): User
        juicers(username: String!): User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addOrchard(userId: ID!): User
        addTree(userId: ID!): Orchard
        addMasher(userId: ID!): User
        addOven(userId: ID!): User
        addJuicer(duration: Int!): Juicer
        updateUser(userId: ID!): User
        updateOrchard(orchardId: ID!): User
        updateTree(treeId: ID!): Orchard
        updateMasher(masherId: ID!): User
        updateOven(ovenId: ID!): User
        updateJuicer(juicerId: ID!): User
        removeUser(userId: ID!): User
    }
`;

// modularize typeDefs
module.exports = typeDefs;
