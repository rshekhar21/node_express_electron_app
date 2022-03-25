const express = require('express')
const router = express.Router()
module.exports = router;

const update = require('../controller/update')

router.post('/party', update.party)
router.post('/product', update.product)
router.post('/material', update.material)
router.post('/bank', update.bankdetails)
router.post('/daybook', update.daybook)
router.post('/employee', update.employee)
router.post('/gst', update.gstdetails)
router.post('/payments', update.payments)
router.post('/shipping', update.shipping)
router.post('/altdetails', update.altdetails)
router.post('/allocate', update.allocate)