const express = require('express');

const userRoutes = require('./users/userRouter');
const postRoutes = require('./posts/postRouter');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('/api/users', userRoutes);
server.use('/api/posts', postRoutes);

//custom middleware

function logger(req, res, next) {}

module.exports = server;
