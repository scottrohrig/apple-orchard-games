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
