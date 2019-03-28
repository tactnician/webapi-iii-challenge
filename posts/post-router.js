const express = require('express');
const router= express.Router();

const Posts = require('./postDb');
// const postMiddleware = require('./post-middleware');

//get()
router.get('/', async (req, res) => {
    try {
        const posts = await Posts.get(req.query);
        res.status(200).json({posts})
    } catch (error) {
        res.status(500).json({message: `error gettin posts: ${error}`})
    }
});

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
router.put('/:id', async (req, res) => {
    try {
        const post = await Posts.update(req.params.id, req.params.text);
        console.log("Post to be changed", post)
        if(post){
            res.status(200).json(post)
        } else {
            res.status(404).json({
                message: `post could not be found`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: `error updating post ${error}`
        })
    }
    
});

//remove()
router.delete('/:id', async (req, res) => {
    try {
        const count = await Posts.remove(req.params.id);
        if(count > 0){
            res.status(200).json({
                message: `post has been deleted`
            })
        } else {
            res.status(404).json({
                message: `post could not be found`
            })
        }
    } catch (error) {
        res.status(500).json({
            message:`error removing post ${error}`
        })
    }
});


module.exports = router;