const { readQuery, runSql, tables } = require('./_db')
const log=console.log;
let sql='';

async function party(data) {
  const {regdate, ptype, name, contact, email, address, debit, credit, baldate, pan, refby, comments, id } = data;
  
  sql=await readQuery(tables.party, 'u')
  return await runSql(sql,[regdate, ptype, name, contact, email, address, debit, credit, baldate, pan, refby, comments, id])
}

async function product(data) {
  const {pcode, pname, comments, contractor, id} = data;

  sql = await readQuery(tables.product, 'u')
  return await runSql(sql, [pcode, pname, comments, contractor, id])
}

async function material(data) {
  //       cl,    cotton length,Meter,30,NaN,30000,2022/03/21,,,1 qtypurch
  const { mcode, mname, unitype, unitcost, qtypurch, purchcost, purchon, supplier, cmnts, id }=data;
  // console.log(data)
  sql = await readQuery(tables.material, 'u')
  return await runSql(sql,[mcode, mname, unitype, +unitcost, +qtypurch, +purchcost, purchon, supplier
    , cmnts, id])
}

async function bankdetails(data) {
  const {bankname, acntnumber, anctname, ifsc, party, id } = data;

  sql = await readQuery(tables.bankdetails, 'u')
  return await runSql(sql,[bankname, acntnumber, anctname, ifsc, party, id ])
}

async function daybook(data) {
  const {party, name, edate, amtpaid, received, pmode, comments, id } = data;
 
  sql=await readQuery(tables.daybook, 'u')
  return await runSql(sql,[pmode, comments, name, edate, amtpaid, received, party, id ])
}

async function employee(data) {
  const {ecode, doj, dob, dept, salary, gender, empid } = data;

  sql = await readQuery(tables.employee, 'u')
  return await runSql(sql,[ecode, doj, dob, dept, salary, gender, empid])
}

async function gstdetails(data) {
  const {corp_contact, corp_email, register_name, gst_number, gst_address, gst_city, gst_pin, gst_state, state_code, party, id } = data;

  sql = await readQuery(tables.gstdetails, 'u')
  return await runSql(sql,[corp_contact, corp_email, register_name, gst_number, gst_address, gst_city, gst_pin, gst_state, state_code, party, id ])
}

async function payments(data) {
  const {party, pymt_date, debit, credit, pymt_type, pymt_mode, narraction, id } = data;

  sql = await readQuery(tables.payments, 'u')
  return await runSql(sql,[party, pymt_date, debit, credit, pymt_type, pymt_mode, narraction, id ])
}

async function shipping(data) {
  const {address, city, state, pincode, notes, party, id } = data;

  sql = await readQuery(tables.shipping, 'u')
  return await runSql(sql,[address, city, state, pincode, notes, party, id])
}


async function altdetails(data) {
  const {alt_contact, alt_email, alt_address, company, party, id } = data;

  sql = await readQuery(tables.altdetails, 'u')
  return await runSql(sql,[alt_contact, alt_email, alt_address, company, party, id])
}

async function allocate(data) {
  const {matid, givento, unitsgiven, purchon, cmnts, id} = data;
  
  sql = await readQuery(tables.allocate, 'u')
  return await runSql(sql,[matid, givento, +unitsgiven, purchon, cmnts, id])
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