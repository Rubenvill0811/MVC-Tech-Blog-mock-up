const router = require('express').Router();
const Post = require('../../models/Post');

router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            ...body, userId: req.session.user_id
        });
        res.json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/id', async (req, res) => {
    try {
        const [rows] = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (rows > 0) {
            res.status(200);
            return
        } else {
            res.status(404);
            return
        }
    } catch (err) {

    }
});

router.delete('/:id', async (req, res) => {
    try {
        const [rows] = Post.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (rows > 0) {
            res.status(200);
            return
        } else {
            res.status(404);
            return
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router