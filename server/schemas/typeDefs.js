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
        users: [User]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
    }
`;

// modularize typeDefs
module.exports = typeDefs;
