router = require('express').Router();
const Post = require('../models/Post');
const router = require('./homePageRoutes');
const { post } = require('./homePageRoutes');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                userId: req.session.use_id,
            },
        });

        const posts = postData.map((post) => post.get({plain: true}));

        res.render('dashboard', {
            dashboard: true,
            posts,
            loggedIn: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/update/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        if (postData) {
            const post = postData.get({plain: true});
            res.render('updatePost', {
                dashboard: true,
                post,
                loggedIn: res.session.logged_in,
            });
        } else {
            res.status(404).json({message:'No post exists with this id'});
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;