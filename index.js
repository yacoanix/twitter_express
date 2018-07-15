const express = require('express');

const app = express();

// Resources routers 
const usersRouter = require('./api/users');
const tweetsRouter = require('./api/tweets');

// Applying middlewares and routes
app.use(express.json());
app.use('/users', usersRouter);
app.use('/tweet', tweetsRouter);

app.listen(5000);