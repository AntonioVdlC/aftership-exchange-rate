const express = require('express');
const router = express.Router();

const get = require('../../../api/rate/get');

router.get('/:base/:target', get);

module.exports = router;
