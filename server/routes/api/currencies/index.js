const express = require('express');
const router = express.Router();

const get = require('../../../api/currencies/get');

router.get('/', get);

module.exports = router;
