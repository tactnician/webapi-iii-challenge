const express = require('express');

const server = express();

const postsRouter = require('./posts/post-router');
const userRouter = require('./users/user-router');

//middlewares 
server.use(express.json);

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
server.use('./api/users', userRouter);


module.exports= server;