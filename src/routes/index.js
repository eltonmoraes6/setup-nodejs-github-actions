const { Router } = require('express');
const router = Router();

router.use('/api/v1/root', require('./root'));
router.use('/api/v1/user', require('./auth'));

module.exports = router;
