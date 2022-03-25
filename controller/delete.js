const model = require('../model/delete')

async function executeDelete(req, res, obj) {
  try {
    let rs = await obj(req.body)
    res.json({status:'success', message:'Records Deleted Successfully', rs})
  } catch (error) {
    res.json(error.message)
  } 
}

function party(req, res) {
  executeDelete(req, res, model.party)
}

function product(req, res) {
  executeDelete(req, res, model.product)
}

function material(req, res) {
  executeDelete(req, res, model.material)
}

function bankdetails(req, res) {
  executeDelete(req, res, model.bankdetails)
}

function daybook(req, res) {
  executeDelete(req, res, model.daybook)
}

function employee(req, res) {
  executeDelete(req, res, model.employee)
}

function gstdetails(req, res) {
  executeDelete(req, res, model.gstdetails)
}

function lotitems(req, res) {
  executeDelete(req, res, model.lotitems)
}

function orders(req, res) {
  executeDelete(req, res, model.orders)
}

function payments(req, res) {
  executeDelete(req, res, model.payments)
}

function shipping(req, res) {
  executeDelete(req, res, model.shipping)
}

function altdetails(req, res) {
  executeDelete(req, res, model.altdetails)
}

function allocate(req, res) {
  executeDelete(req, res, model.allocate)
}

module.exports = {
  party,
  product,
  material,
  bankdetails,
  daybook,
  employee,
  gstdetails,
  lotitems,
  orders,
  payments,
  shipping,
  altdetails,
  allocate
}