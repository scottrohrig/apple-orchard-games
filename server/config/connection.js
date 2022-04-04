const mongoose = require( 'mongoose' );

mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost/orchard_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,    // MongoParseError: options usecreateindex, usefindandmodify are not supported
  // useFindAndModify: false  //
} );

module.exports = mongoose.connection;
