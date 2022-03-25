const model = require('../model/update')

async function executeUpdate(req, res, obj) {
  try {
    let rs = await obj(req.body)
    res.json({status:'success', message:'Recored updated successfully!', rs})
  } catch (error) {
    res.json(error.message)
  } 
}

function party(req, res) {
  executeUpdate(req, res, model.party)
}

function product(req, res) {
  executeUpdate(req, res, model.product)
}

function material(req, res) {
  executeUpdate(req, res, model.material)
}

function bankdetails(req, res) {
  executeUpdate(req, res, model.bankdetails)
}

function daybook(req, res) {
  executeUpdate(req, res, model.daybook)
}

function employee(req, res) {
  executeUpdate(req, res, model.employee)
}

function gstdetails(req, res) {
  executeUpdate(req, res, model.gstdetails)
}

function payments(req, res) {
  executeUpdate(req, res, model.payments)
}

function shipping(req, res) {
  executeUpdate(req, res, model.shipping)
}

function altdetails(req, res) {
  executeUpdate(req, res, model.altdetails)
}

function allocate(req, res) {
  executeUpdate(req, res, model.allocate)
}

module.exports = {
  party,
  product,
  material,
  bankdetails,
  daybook,
  employee,
  gstdetails,
  payments,
  shipping,
  altdetails,
  allocate
}