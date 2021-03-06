const express = require('express');
const router = express.Router();

router.use('/currencies', require('./currencies'));
router.use('/rate', require('./rate'));

module.exports = router;
