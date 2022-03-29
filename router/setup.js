const express = require('express')
const router = express.Router()
const setup = require('../controller/setup')
router.post('/setup', setup.setup)
router.post('/create', setup.createdb)
router.post('/drop', setup.dropdb)
router.post('/config', setup.config)
module.exports = router;