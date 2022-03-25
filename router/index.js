const express = require('express')
const router = express.Router()
module.exports = router

router.get('/order', (req,res) => res.render('web/order'))
router.get('/order-details', (req,res) => res.render('web/odetails'))
router.get('/unit-details', (req,res) => res.render('web/unitdata'))
router.get('/product', (req,res) => res.render('web/product'))
router.get('/raw-material', (req,res) => res.render('web/material'))
router.get('/ledger', (req,res) => res.render('web/ledger'))
router.get('/ledger-entry', (req,res) => res.render('web/ledgerentry'))
router.get('/ledger-history', (req,res) => res.render('web/ledgerhist'))
router.get('/daybook', (req,res) => res.render('web/daybook'))
router.get('/contractor', (req,res) => res.render('web/contractor'))
router.get('/supplier', (req,res) => res.render('web/supplier'))
router.get('/customer', (req,res) => res.render('web/customer'))
router.get('/employee', (req,res) => res.render('web/employee'))
router.get('/bank-details', (req,res) => res.render('web/bankdetails'))
router.get('/gst-details', (req,res) => res.render('web/gst'))
router.get('/shipping-details', (req,res) => res.render('web/shipping'))
router.get('/allocate-material', (req,res) => res.render('web/allocate'))
router.get('/aud', (req,res) => res.render('web/aud'))
// router.get('/', (req,res) => res.render('web/'))