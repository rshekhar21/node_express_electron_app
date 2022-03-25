import help from './helper.js'
document.addEventListener('DOMContentLoaded', function (e) {
  document.getElementById('page-heading').innerHTML="Order Details"
  const tblName='orders';
  const btnRefresh=document.getElementById('second-groupbtn')
  const btnShowModal=document.getElementById('first-groupbtn')
  const log=console.log
  const myModal=document.getElementById('staticBackdrop')
  const Modal=new bootstrap.Modal(document.getElementById('staticBackdrop'), {
    keyboard: false
  })
  
  // btnShowModal.disabled=true;

  myModal.addEventListener('show.bs.modal', function (e) {    
    e.preventDefault()
  })


  btnRefresh.addEventListener('click', function (e) {
    set_and_refresh_data_table(e)
  })


  async function set_and_refresh_data_table(e) {
    let obj={
      //add linkcell:'id'/'etc' and thead:true/false for desired result
      url: `/api/crud/select/${tblName}`,
    }
    help.set_and_refresh_data_table_test(obj, setRows)
  }
  function setRows(arr) {
    if (!arr) {
      return
    }
    arr.forEach(r => {
      r.addEventListener('click', async function (e) {
        if (e.target.classList.contains('idcol')) {
          const id = e.target.innerHTML
          // let url=`/api/crud/select/query/?sql=SELECT * FROM ${tblName} WHERE id =${id}`
          // const d=await help.getData(encodeURI(url))
          // alert('ok')  // readt test for click
          let sure= confirm('are you sure want to delete this order?')
          if (sure) {
            const url='/api/crud/delete/orders'
            const data={ id }
            let rs=await help.postData(url, data)
            if (rs.status==='success') { //rs.status==='success'
              if (rs.rs.length>0) {
                alertBox.classList.remove('d-none')
                alertBox.innerText = String(rs.rs).split('\n')[0] //'raj shekhar singh' //rs.rs.error
              } else {
                set_and_refresh_data_table(e)                
              }
            } 
          } 
        }
      })
    })
  }


  set_and_refresh_data_table(e)
})