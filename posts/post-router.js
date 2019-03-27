const express = require('express');
const router= express.Router();

const Posts = require('./postDb');
// const postMiddleware = require('./post-middleware');

//get()
// router.get();

//getById()
router.get('/:id', async (req, res) => {
    try {
        const post = await Posts.getById(req.params.id);
        if (post[0]) {
            res.status(200).json(post);
        } else {
            res.status(404).json({message:`post not found`})
        }
    } catch (error) {
        res.status(500).json({
            message: `Error fetching post: ${error}` 
        })      
    }
});

//insert()
router.post('/', async (req, res) => {
    const post = req.body; 
    console.log("Insert Post: ", post)
    if(post.text || " " ){
        try {
            res.status(201).json(post)
        } catch (error) {
            res.status(500).json({
                message: `error inserting post ${error}`
            })
        }
    } else {
        res.status(400).json({
            errorMessage: "post text field is required"
        })
    }
});

//update()
// router.put();

//remove()
// router.delete();


module.exports = router;