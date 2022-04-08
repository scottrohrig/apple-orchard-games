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
    }

    type Tree {
        _id: ID
    }

    type Juicer {
        _id: ID
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
        addOrchard: User
        addTree: Orchard
        addMasher: User
        addOven: User
        addJuicer: User
        updateUser(username: String, email: String, password: String): Auth
        updateOrchard: Orchard
        updateTree: User
        updateMasher: User
        updateOven: User
        updateJuicer: User
        
    }
`;

// modularize typeDefs
module.exports = typeDefs;
