const express = require('express')
const router = express.Router()
module.exports = router;

const create = require('../controller/create')

router.post('/party', create.party)
router.post('/product', create.product)
router.post('/material', create.material)
router.post('/bank', create.bankdetails)
router.post('/daybook', create.daybook)
router.post('/employee', create.employee)
router.post('/gst', create.gstdetails)
router.post('/orderitems', create.orderitems)
router.post('/orders', create.orders)
router.post('/payments', create.payments)
router.post('/shipping', create.shipping)
router.post('/altdetails', create.altdetails)
router.post('/allocate', create.allocate)