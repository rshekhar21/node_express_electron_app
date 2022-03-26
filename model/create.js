const { readQuery, runSql, tables }=require('./_db')
const log=console.log;
let sql = '';

async function party(data) {
  const { party, regdate, ptype, name, contact, email, address, debit, credit, baldate, pan, refby, comments }=data;
  
  // const r=Object.values(data);
  // log(r)

  // // log(data)
  // return
  sql = await readQuery(tables.party, 'n')
  return await runSql(sql,[party, regdate, ptype, name, contact, email, address, debit, credit, baldate, pan, refby, comments])
}

async function product(data) {
  const { pid, pcode, pname, comments, contractor } = data;
  sql = await readQuery(tables.product, 'n')
  return await runSql(sql,[pid, pcode, pname, comments, contractor])
}

async function material(data) {  
  const { matid, mcode, mname, unitype, unitcost, qtypurch, purchcost, purchon, supplier
    // , unitsgiven, givento
    , cmnts }=data;
  
  sql = await readQuery(tables.material, 'n')
  return await runSql(sql,[matid, mcode, mname, unitype, +unitcost, +qtypurch, +purchcost, purchon, supplier
    // , +unitsgiven, givento
    , cmnts])
}

async function allocate(data) {
  const { matid, givento, unitsgiven, purchon, cmnts }=data;
  // log(data)
  
  sql=await readQuery(tables.allocate, 'n')
  return await runSql(sql,[matid, givento, +unitsgiven, purchon, cmnts])
}


async function bankdetails(data) {
  const {party, bankname, acntnumber, anctname, ifsc} = data;
  
  sql = await readQuery(tables.bankdetails, 'n')
  return await runSql(sql,[party, bankname, acntnumber, anctname, ifsc])
}

async function daybook(data) {
  const {party, name, edate, amtpaid, received, pmode, comments} = data;
  log(data)
  sql=await readQuery(tables.daybook, 'n')
  return await runSql(sql,[party, name, edate, amtpaid, received, pmode, comments])
}

async function employee(data) {
  const {empid, ecode, doj, dob, dept, salary, gender} = data;
  
  sql = await readQuery(tables.employee, 'n')
  return await runSql(sql,[empid, ecode, doj, dob, dept, salary, gender])
}

async function gstdetails(data) {
  const {party, corp_contact, corp_email, register_name, gst_number, gst_address, gst_city, gst_pin, gst_state, state_code} = data;
  
  sql = await readQuery(tables.gstdetails, 'n')
  return await runSql(sql,[party, corp_contact, corp_email, register_name, gst_number, gst_address, gst_city, gst_pin, gst_state, state_code])
}

async function orders(data) {
  const { orderId, odrate, pcode, cntrid, odrqty, misexp, arcost, allttl, cmnts }=data;
  // return 'success'
  sql=await readQuery(tables.orders, 'n')
  return await runSql(sql,[orderId, odrate, pcode, cntrid, +odrqty, +misexp, +arcost, +allttl, cmnts])
}

async function orderitems(data) {
  const {values} = data;
  sql=await readQuery(tables.orderitems, 'n')
  return await runSql(sql+values)
}

async function payments(data) {
  const {party, pymt_date, debit, credit, pymt_type, pymt_mode, narraction} = data;
  sql = await readQuery(tables.payments, 'n')
  return await runSql(sql,[party, pymt_date, debit, credit, pymt_type, pymt_mode, narraction])
}

async function shipping(data) {
  const {party, address, city, state, pincode, notes} = data;
  
  sql = await readQuery(tables.shipping, 'n')
  return await runSql(sql,[party, address, city, state, pincode, notes])
}

async function altdetails(data) {
  const {party, alt_contact, alt_email, alt_address, company} = data;
  
  sql = await readQuery(tables.altdetails, 'n')
  return await runSql(sql,[party, alt_contact, alt_email, alt_address, company])
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
