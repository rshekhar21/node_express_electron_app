const express = require('express')
const router = express.Router()
module.exports = router;

const del = require('../controller/delete')

router.post('/party', del.party)
router.post('/product', del.product)
router.post('/material', del.material)
router.post('/bank', del.bankdetails)
router.post('/daybook', del.daybook)
router.post('/employee', del.employee)
router.post('/gst', del.gstdetails)
router.post('/orders', del.orders)
router.post('/lotitems', del.lotitems)
router.post('/payments', del.payments)
router.post('/shipping', del.shipping)
router.post('/altdetails', del.altdetails)
router.post('/allocate', del.allocate)