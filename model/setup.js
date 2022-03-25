const { readQuery, runSql, tables } = require('./_db')
let sql = '';

async function setupDatabase(key) {
  if (key !=='shekhar83#') {
    // console.log(key)
    return 'Invalid Key'
  } else {
    try {
      //drop all
      sql = await readQuery('all', 'd')
      await runSql(sql);
      
      //create party  1
      sql = await readQuery(tables.party, 'c')
      await runSql(sql)
  
      //create altdetails 2
      sql = await readQuery(tables.altdetails, 'c')
      await runSql(sql)
  
      //create bankdetails  3
      sql = await readQuery(tables.bankdetails, 'c')
      await runSql(sql)
  
      //create gstdetails  4
      sql = await readQuery(tables.gstdetails, 'c')
      await runSql(sql)
  
      //create daybook  5
      sql = await readQuery(tables.daybook, 'c')
      await runSql(sql)
  
      //create employee 6
      sql = await readQuery(tables.employee, 'c')
      await runSql(sql)
  
      //create payments 7
      sql = await readQuery(tables.payments, 'c')
      await runSql(sql)
  
      //create shipping 8
      sql = await readQuery(tables.shipping, 'c')
      await runSql(sql)
  
      //create product  9
      sql = await readQuery(tables.product, 'c')
      await runSql(sql)
  
      //create material 10
      sql = await readQuery(tables.material, 'c')
      await runSql(sql)
  
      //create orders 11
      sql = await readQuery(tables.orders, 'c')
      await runSql(sql)
  
      //create orderitems 12
      sql = await readQuery(tables.orderitems, 'c')
      await runSql(sql)

      //create allocation 13
      sql = await readQuery(tables.allocate, 'c')
      await runSql(sql)
      
      return 'All Tables has been Created Successfully!'
    } catch (error) {
      return error
    }
  }  
}

module.exports = {setupDatabase};