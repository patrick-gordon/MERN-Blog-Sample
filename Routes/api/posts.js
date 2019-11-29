const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//Post Model
const Post = require('../../models/Post')


//@Route GET api/posts
//@Description GET ALL Posts
//@Access Restricted
router.get('/', auth,  (req, res) => {
    Post.find()
        .sort({date: -1})
        .then(posts => res.json(posts))
});



//@Route POST api/posts
//@Description Create Posts
//@Access Restricted
router.post('/', auth, (req,res) => {
    const newPost = new Post({
        title: req.body.title,
        body: req.body.body
    });
    newPost.save().then(post => res.json(post));
})


// @route DELETE api/posts/:id
// @description delete a post
// @access Restricted
router.delete('/:id', auth, (req, res) => {
    Post.findById(req.params.id)
     .then(post => post.remove().then(() => res.json({success: true})))
     .catch(err => res.status(404).json({ success: false }));
   })


module.exports = router;