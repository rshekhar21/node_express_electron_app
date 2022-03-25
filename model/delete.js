const { readQuery, runSql, tables } = require('./_db')
let sql = '';

async function deleteRecords(tbl, id) {
  try {
    sql = `delete from ${tbl} where id = ${id}`
    return await runSql(sql)
  } catch (error) {
    return error
  }
}

function party(data) {
  return deleteRecords(tables.party, data.id)
}

function product(data) {
  console.log(data)
  return deleteRecords(tables.product, data.id)
}

function material(data) {
  return deleteRecords(tables.material, data.id)
}

function bankdetails(data) {
  return deleteRecords(tables.bankdetails, data.id)
}

function daybook(data) {
  return deleteRecords(tables.daybook, data.id)
}

function employee(data) {
  return deleteRecords(tables.employee, data.id)
}

function gstdetails(data) {
  return deleteRecords(tables.gstdetails, data.id)
}

function lotitems(data) {
  return deleteRecords(tables.lotitems, data.id)
}

function orders(data) {
  return deleteRecords(tables.orders, data.id)
}

function payments(data) {
  return deleteRecords(tables.payments, data.id)
}

function shipping(data) {
  return deleteRecords(tables.shipping, data.id)
}

function altdetails(data) {
  return deleteRecords(tables.altdetails, data.id)
}

function allocate(data) {
  return deleteRecords(tables.allocate, data.id)
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