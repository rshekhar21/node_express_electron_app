const express = require('express')
const router = express.Router()
const setup = require('../controller/setup')
router.post('/setup', setup.setup )
module.exports = router;