const express = require('express')
const router = express.Router()
module.exports = router;

router.use('/create', require('./create'))  //create
router.use('/select', require('./select'))  //read
router.use('/update', require('./update'))  //update
router.use('/delete', require('./delete'))  //delete
