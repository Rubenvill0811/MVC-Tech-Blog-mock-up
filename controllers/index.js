const router = require('express').Router();

const homePageRoutes = require('./homePageRoutes');
const dashRoutes = require('./dashRoutes');
const api = require('./api');

router.use('/', homePageRoutes);
router.use('/api', api);
router.use('/dashboard', dashRoutes);

module.exports = router;