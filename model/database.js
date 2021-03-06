var mongoose = require('mongoose');
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } }; 
mongoose.connect('mongodb://manoj337:manoj337@ds155028.mlab.com:55028/intelliadv',options);     // connection to database by mangoose ODM
var Schema = mongoose.Schema;   // create scheme for specific collection to do operation

// create a schema
     
var userSchema = new Schema({any:{}},{ strict: false });


// create index to avoid duplicate entry in databse 
userSchema.index( { base: 1, date: 1 }, { unique: true } );


// we need to create a model using its
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;