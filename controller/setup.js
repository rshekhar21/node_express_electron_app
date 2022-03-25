const model=require('../model/setup')

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

module.exports = {setup}