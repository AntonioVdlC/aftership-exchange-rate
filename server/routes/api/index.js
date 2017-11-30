const express = require('express');
const router = express.Router();

router.use('/currencies', require('./currencies'));

module.exports = router;
