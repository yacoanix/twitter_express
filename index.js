const express = require('express');

const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/twitter');
// Resources routers 
const usersRouter = require('./api/users');
const tweetsRouter = require('./api/tweets');

app.set('views' , './views')
app.set('view engine' , 'pug')

// Applying middlewares and routes
app.use(express.json());
app.use('/users', usersRouter);
app.use('/tweet', tweetsRouter);



app.listen(5000);