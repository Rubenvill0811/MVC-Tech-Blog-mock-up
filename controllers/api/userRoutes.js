const router = require('express').Router();
const User = require('../../models/User');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(()=> {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_id = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username
            },
        });

        if (!userData) {
            res.status(500).json({message: 'invalid username or password.'});
            return
        }

        const passwordValidation = await userData.checkPassword(req.body.password);

        if(!passwordValidation) {
            res.status(500).json({message: 'invalid username or password.'});
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_id = true;

            res.status(200).json({
                userData,
                message: 'Successfully logged in.',
            });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_id) {
        res.status(200);
        return;
    } else {
        res.status(500).json({message: 'error'})
    }
});

module.exports = router;