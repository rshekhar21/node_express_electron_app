import help from './helper.js'
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('page-heading').innerHTML="Allocated Raw-Material Details"
  // document.getElementById('staticBackdropLabel').innerHTML="Allocate Raw Material"

  const tblName='aud'
  const log=console.log;
  
  function set_and_refresh_data_table() {
    let obj={
      //add linkcell:'id'/'etc' and thead:true/false for desired result
      url: `/api/crud/select/${tblName}`,
    }
    // log(obj.url)
    help.set_and_refresh_data_table_test(obj)
  }
   
  set_and_refresh_data_table()


})