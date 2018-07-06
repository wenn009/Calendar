var mongoose = require('mongoose');

var promise = mongoose.connect('mongodb://user:user009@ds227821.mlab.com:27821/calendar009', {
  useMongoClient: true,
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Yay! connected to mongo db2');
});

const eventSchema = mongoose.Schema({
    'date': Date,
    'starttime': String,
    'endtime': String,
    'description': String,
});


module.exports = mongoose.model('event', eventSchema);