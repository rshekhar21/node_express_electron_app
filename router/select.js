const express = require('express')
const router = express.Router()
module.exports = router;

const select = require('../controller/select')

router.get('/party', select.party)
router.get('/contractor', select.contractor)
router.get('/product', select.product)
router.get('/material', select.material)
router.get('/bank', select.bankdetails)
router.get('/daybook', select.daybook)
router.get('/emp', select.employee)
router.get('/gst', select.gstdetails)
router.get('/orderitems', select.orderitems)
router.get('/orders', select.orders)
router.get('/pymt', select.payments)
router.get('/ship', select.shipping)
router.get('/alt', select.altdetails)
router.get('/query/', select.opensql)
router.get('/allocate/', select.allocate)
router.get('/aud/', select.aud)
