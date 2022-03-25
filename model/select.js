const { readQuery, runSql, tables } = require('./_db')
let sql = '';

async function selectRecords(queryfile) {
  try {
    sql = await readQuery(queryfile)
    // console.log(sql)
    return await runSql(sql)
  } catch (error) {
    return error
  }
}

function party() {
  return selectRecords(tables.party)
}

function product() {
  return selectRecords(tables.product)
}

function contractor() {
  return selectRecords(tables.contractor)
}

function gstdetails() {
  return selectRecords('gst')
}

function bankdetails() {
  return selectRecords('bank')
}

function employee() {
  return selectRecords(tables.employee)
}

function payments() {
  return selectRecords(tables.payments)
}

function shipping() {
  return selectRecords(tables.shipping)
}

function altdetails() {
  return selectRecords(tables.altdetails)
}

function material() {
  return selectRecords(tables.material)
}

function orders() {
  return selectRecords(tables.orders)
}

function orderitems() {
  return selectRecords(tables.orderitems)
}

function allocate() {
  return selectRecords(tables.allocate)
}

function aud() {
  return selectRecords('aud')
}

async function opensql(sql) {
  try {
    return await runSql(sql) 
  } catch (error) {
    return error
  }
}


module.exports = {
  party,
  contractor,
  gstdetails,
  bankdetails,
  employee,
  payments,
  shipping,
  altdetails,
  opensql,
  product,
  material,
  orders,
  orderitems,
  allocate,
  aud
}