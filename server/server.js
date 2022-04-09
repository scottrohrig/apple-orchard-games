const path = require('path');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const app = express();
const PORT = process.env.PORT || 3001;

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');

// create Apollo server instance and config
const startServer = async () => {
  // create new Apollo server and pass in our schema data
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  });

  // Start the Apollo server
  await server.start();

  // integrate our Apollo server with the Express app as middleware
  server.applyMiddleware({ app });

  // log URL to test GraphQL API
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

// initialize apollo server
startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// send 404.html files

// serve up static assets\
// if ( process.env.NODE_ENV === 'production' ) {
//   app.use( express.static( path.joing( __dirname, '../client/build' ) ) );
// }

db.once('open', () => {

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });

});
