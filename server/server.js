const path = require( 'path' );
const express = require( 'express' );
// ApolloServer ⇒
const app = express();
const PORT = process.env.PORT || 3001;

// require schemas here ↓
// require middleware
const db = require( './config/connection' );

// create Apollo server instance and config

// initialize apollo server

app.use( express.urlencoded( { extended: false } ) );
app.use( express.json() );

// send 404.html files

// serve up static assets\
// if ( process.env.NODE_ENV === 'production' ) {
//   app.use( express.static( path.joing( __dirname, '../client/build' ) ) );
// }

db.once( 'open', () => {

  app.listen( PORT, () => {
    console.log( `API server running on port ${ PORT }!` );
  } );

} );
