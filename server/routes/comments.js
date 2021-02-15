const express = require('express');
const router = express.Router();


const { Comment } = require('../models/Comment');

router.post('/saveComment', (req, res) => {
    const comment = new Comment(req.body)

    comment.save((err, comment) => {
        if (err) return res.status(400).send(err)

        Comment.find({ '_id': comment._id }).populate('writer').exec((err, result) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, result })
        })
    })


})


router.post('/getComment', (req, res) => {
    Comment.find({ 'postId': req.body.postId }).populate('writer').exec((err, comments) => {
        if (err) res.status(400).send(err)
        res.status(200).json({ success: true, comments })
    })

})



module.exports = router;
