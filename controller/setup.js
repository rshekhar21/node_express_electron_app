const model=require('../model/setup')
const log=console.log;

async function setup(req, res) {
  let { key }=req.body  
  if (key==='' || !key) {
    res.end('Please Enter Setup Key!')
  } else {
    try {
      let rs=await model.setupDatabase(key)
      res.send(rs)
    } catch (error) {
      res.send(error.message)
    }
  }  
}

async function createdb(req, res) {
  const data=req.body;
  if (data.key===''||data.key!=='shekhar83#') res.end('invalid/no key')
  const key = data.key
  try {
    delete data.key
    let rs=await model.createdb(data)    
    res.send(rs)
    if(rs.error) throw rs
  } catch (error) {
    res.send( error)
  }
}

async function dropdb(req, res) {
  const data=req.body;  
  if(data.key==='' || data.key!== 'shekhar83#') res.end('invalid/no key')
  try {
    delete data.key
    let rs=await model.dropdb(data)
    if(rs.error) throw rs
    res.send(rs)
  } catch (error) {
    res.send( error)
  }
}


function config(req, res) {
  const data=req.body
  if (!data) res.end('no data found');
  try {
    let rs=model.config(data)
    log(rs)
    res.send(rs)
  } catch (error) {
    res.send(error)
  }
}


module.exports = {setup, createdb, dropdb, config}