const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan')

const postsRouter = require('./posts/post-router');
// const userRouter = require('./users/user-router');

const server = express();

//middlewares 
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
// server.use();

//sanity check 
server.get('/', (req, res) => {
    res.send(`
    <div style="background-image: url('https://i.redd.it/lwwt86ci5anz.jpg'); background-size: cover; height: 700px; ">
        <h2 style="color:white;"> Portal </h2>
    </div>
    `)
});

//router
server.use('./api/posts', postsRouter);
// server.use('./api/users', userRouter);


module.exports= server;