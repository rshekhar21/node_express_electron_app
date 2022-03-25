const model = require('../model/create')

async function executeInsert(req, res, obj) {
  try {
    let rs=await obj(req.body)
    let status='';
    rs.length===0?status='fail':status='success'
    res.json({status, message:'Record created Successfully!', rs})
  } catch (error) {
    res.json(error.message)
  } 
}

function party(req, res) {
  executeInsert(req, res, model.party)
}

function product(req, res) {
  executeInsert(req, res, model.product)
}

function material(req, res) {
  executeInsert(req, res, model.material)
}

function bankdetails(req, res) {
  executeInsert(req, res, model.bankdetails)
}

function daybook(req, res) {
  executeInsert(req, res, model.daybook)
}

function employee(req, res) {
  executeInsert(req, res, model.employee)
}

function gstdetails(req, res) {
  executeInsert(req, res, model.gstdetails)
}

function orderitems(req, res) {
  executeInsert(req, res, model.orderitems)
}

function orders(req, res) {
  executeInsert(req, res, model.orders)
}

function payments(req, res) {
  executeInsert(req, res, model.payments)
}

function shipping(req, res) {
  executeInsert(req, res, model.shipping)
}

function altdetails(req, res) {
  executeInsert(req, res, model.altdetails)
}

function allocate(req, res) {
  executeInsert(req, res, model.allocate)
}

module.exports = {
  party,
  product,
  material,
  bankdetails,
  daybook,
  employee,
  gstdetails,
  orderitems,
  orders,
  payments,
  shipping,
  altdetails,
  allocate
}