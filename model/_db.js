const pg = require('pg')
const fs = require('fs')

const cnstr = {
  host: 'localhost',
  user: 'postgres',
  port: '5432',
  password: '269608',
  database: 'TestDB',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
}

const Pool = new pg.Pool(cnstr)

function runSql(query, values = []) {
  return new Promise(function (resolve, reject) {
    Pool.query(query, values, (err, result) => {
      // console.log(query+values)
      if (err) return reject(err.stack)
      // console.log(result.rows)
      return resolve(result.rows)
    })
  })
}



function readQuery(filename, qtype='r') {
  return new Promise(function (resolve, reject) {
    if (!filename) return reject(new Error('No File Found'))
    if (qtype.toLocaleLowerCase().trim() == 'r') filePath = `\\sqlfiles\\select\\${filename}.sql`;
    if (qtype.toLocaleLowerCase().trim() == 'c') filePath = `\\sqlfiles\\create\\${filename}.sql`;
    if (qtype.toLocaleLowerCase().trim() == 'n') filePath = `\\sqlfiles\\insert\\${filename}.sql`;
    if (qtype.toLocaleLowerCase().trim() == 'u') filePath = `\\sqlfiles\\update\\${filename}.sql`;
    if (qtype.toLocaleLowerCase().trim() == 'd') filePath = `\\sqlfiles\\delete\\${filename}.sql`;
    let file = fs.readFileSync(__dirname + filePath, { encoding: "utf-8", flag: "r" })
    // console.log(file.trim())
    return resolve(file.trim())
  })
}

const tables = {
  party:        'party',
  gstdetails:   'gstdetails',
  bankdetails:  'bankdetails',
  payments:     'payments',
  altdetails:   'altdetails',
  shipping:     'shipping',
  product:      'product',
  material:     'material',
  orders:       'orders',
  orderitems:    'orderitems',
  employee:     'employee',  
  daybook:      'daybook',
  contractor:   'contractor',
  customer:     'customer',
  supplier: 'supplier',
  allocate: 'allocate'
}

async function rq(filename) {
  let filepath = '\\sqlfiles\\read\\' + filename + '.sql';
  // console.log(fs.readFile(filepath))
  console.log( __dirname + filepath)
  return fs.readFileSync(__dirname + filepath, { encoding: "utf-8", flag: "r" });
}



module.exports = {runSql, readQuery, tables}

// pool.end(() => {
//   console.log('pool has ended')
// })
