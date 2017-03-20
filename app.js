const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var Book = require('./models/bookModel');

mongoose.connect('mongodb://localhost/bookAPI');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log("Connected to MongoDB");
})

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

bookRouter = require('./routes/bookRoutes')(Book);

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my api');
});

app.listen(port, () => {
  console.log('LOL Running on PORT: '+port);
});
