const model = require('../model/select')
const { runSql }=require('../model/_db')
const log = console.log
async function executeRead(req, res, obj) {
  try {
    let rs=await obj(req.body)
    let status = ''
    rs.length===0?status = 'no':status = 'ok'
    res.json({status,rs})
    // res.json(rs)
  } catch (error) {
    res.json(error.message)
  } 
}

function party(req, res) {
  executeRead(req, res, model.party)
}

function contractor(req, res) {
  executeRead(req, res, model.contractor)
}

function product(req, res) {
  executeRead(req, res, model.product)
}

// function material(req, res) {
//   executeRead(req, res, model.material)
// }

function bankdetails(req, res) {
  executeRead(req, res, model.bankdetails)
}

function daybook(req, res) {
  executeRead(req, res, model.daybook)
}

function employee(req, res) {
  executeRead(req, res, model.employee)
}

function gstdetails(req, res) {
  executeRead(req, res, model.gstdetails)
}

function material(req, res) {
  executeRead(req, res, model.material)
}

function orders(req, res) {
  executeRead(req, res, model.orders)
}

function orderitems(req, res) {
  executeRead(req, res, model.orderitems)
}

function payments(req, res) {
  executeRead(req, res, model.payments)
}

function shipping(req, res) {
  executeRead(req, res, model.shipping)
}

function altdetails(req, res) {
  executeRead(req, res, model.altdetails)
}

function allocate(req, res) {
  executeRead(req, res, model.allocate)
}

function aud(req, res) {
  executeRead(req, res, model.aud)
}

async function opensql(req, res) {
  try {
    let { sql }=req.query
    let rs=await runSql(sql)
    // console.log(rs.length)    
    let status = rs.length>0?'ok':'blank'
    return res.json({status, rs})
  } catch (error) {
    return error
  }
}

module.exports = {
  party,
  contractor,
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
  allocate,
  opensql,
  aud
}