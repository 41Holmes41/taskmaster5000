var mongoose = require('mongoose');

mongoose.connect('process.env.DATABASE_URL',
    {useNewUrlParser: true, useCreateIndex: true}
);

const db = mongoose.connection;

db.on('connected', function(){
    console.log(`Mongoose connected to: ${process.env.DATABASE_URL}`);
});

db.on('error', function(err){
    console.log('MongoDB has thrown an error: ', err);
});