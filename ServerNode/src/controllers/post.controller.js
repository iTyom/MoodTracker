const express = require('express');
const router = express.Router();
const jwt = require('../../_helpers/jwt');
const db = require('../../_helpers/db');


// routes
router.post('/addPost', jwt.isAuthorized, addPost);
router.get('/getPosts', jwt.isAuthorized, getPosts);
router.get('/getPostsByAllegiance', jwt.isAuthorized, getPostsByAllegiance);


module.exports = router;

function getPosts(req, res, next) {
    db.Post.find({
            'postedBy._id': req.params.userId
        })
        .then(data => data ? res.json(data) : res.status(400).json({
            message: "Erreur"
        }))
        .catch(err => next(err));
}

function getPostsByAllegiance(req, res, next) {
    db.Post.find({
            'postedBy._id': req.params.userId,
            'allegiance': req.params.allegiance
        })
        .then(data => data ? res.json(data) : res.status(400).json({
            message: "Erreur"
        }))
        .catch(err => next(err));
}

async function addPost(req, res, next) {

    db.User.findOne({
            '_id': req.userId
        })
        .then(user => {
            if (user) {
                console.log("addPost -> user", user);
                var post = new db.Post({
                    text: req.body.text,
                    allegiance: req.body.allegiance,
                    postedBy: user
                });
                post.save()
                    .then(data => data ? res.status(201).json(post) : res.status(400).json({
                        message: "Erreurs"
                    }))
                    .catch(err => next(err));
            } else {
                res.status(400).json({
                    message: "Erreurss"
                })
            }
        })
        .catch(err => next(err));
}