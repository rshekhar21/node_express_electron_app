import help from './helper.js'
document.addEventListener('DOMContentLoaded', function (e) {
  document.getElementById('page-heading').innerHTML="Product"

  const myModal=document.getElementById('staticBackdrop')
  const Modal=new bootstrap.Modal(document.getElementById('staticBackdrop'), {
    keyboard: false
  })

  const log=console.log
  const tblName = 'product'
  const btnSubmit=document.getElementById('submit')
  const btnRefresh=document.getElementById('second-groupbtn')
  const inputForm=document.getElementById('input-form')
  const inputFocus=document.getElementById('pname')
  const btnReset=document.getElementById('resetForm')
  const btnDelete=document.getElementById('delete')
  const alertBox=document.getElementById('alert-box')

  document.getElementById('staticBackdropLabel').innerHTML="Create Product"
  
  // function modal set-focus
  myModal.addEventListener('shown.bs.modal', function () {
    inputFocus.focus()
  })

  myModal.addEventListener('show.bs.modal', function () {    
    // help.getAsList({sql:help.listSql.contractor, elementID:'contractor'})
  })

  myModal.addEventListener('hidden.bs.modal', function () {
    inputForm.reset();
    btnSubmit.innerText='Add'
    document.getElementById('delete').classList.add('d-none')
    alertBox.classList.add('d-none')
  })

  
  function set_and_refresh_data_table() {
    let obj={
      //add linkcell:'id'/'etc' and thead:true/false for desired result
      url: `/api/crud/select/${tblName}`,
    }
    help.set_and_refresh_data_table_test(obj, setRows)
  } 
  function setRows(arr) {
    if (!arr) return
    arr.forEach(r => {
      r.addEventListener('click', async function (e) {
        if (e.target.classList.contains('idcol')) {
          const id=e.target.innerHTML
          let url=`/api/crud/select/query/?sql=SELECT * FROM ${tblName} WHERE id =${id}`
          const d=await help.getData(encodeURI(url))
          if (d.status==='ok') {
            const data=d.rs[0]
            Modal.show();
            document.getElementById('pname').value=data.product_name
            document.getElementById('pcode').value=data.pcode
            // document.getElementById('contractor').value=data.contractor
            document.getElementById('delid').value=id
            document.getElementById('comments').value=data.comments
            btnSubmit.innerText = 'Update'
            btnDelete.classList.remove('d-none')
          }
        }
      })
    })
  }

  // cal function to refresh
  set_and_refresh_data_table()

   // functin to crate or updat party
  async function createUpdate(obj) {
    const data=help.formDataToJson(new FormData(inputForm))
    data.pid='p_'+help.uuid()
    data.contractor? data.contractor=data.contractor.split('/')[1].trim():data.contractor=null 
    if (!data.pname) {
      alert('Product Name is Must to Add Product')
      return false
    }
    let url=''

    if (obj.create) {
      url=`/api/crud/create/${tblName}`
    } else {
      // alert('ok 1321')
      url=`/api/crud/update/${tblName}`
      data.id = obj.id
    }
    const result= await help.postData(url, data)
    if (result.status=='success') {
      inputForm.reset()
      Modal.hide();
    }    
    // refresh table
    set_and_refresh_data_table(e)
  }
  

  //crete new button click function
  btnSubmit.addEventListener('click', async function (e) {
    e.preventDefault();
    if (btnSubmit.innerText==='Add') {
      createUpdate({create:true})
    } else {
      const delid=parseInt(document.getElementById('delid').value)
      createUpdate({create:false, id:delid})
    }
  })
  

  btnRefresh.addEventListener('click', async function (e) {
    set_and_refresh_data_table(e)
  })

  //deltet line
  btnDelete.addEventListener('click', async function (e) {
    const answer =confirm("Are you Sure want to delete this Product?");
    const delid=parseInt(document.getElementById('delid').value)
    if (answer) {
      const url=`/api/crud/delete/${tblName}`
      const data={ id: delid }
      let rs=await help.postData(url, data)
      if (rs.status==='success') { //rs.status==='success'
        if (rs.rs.length>0) {
          alertBox.classList.remove('d-none')
          alertBox.innerText = String(rs.rs).split('\n')[0] //'raj shekhar singh' //rs.rs.error
        } else {
          inputForm.reset()
          Modal.hide();
          set_and_refresh_data_table(e)
        }
      } 
    } 
  })

  btnReset.addEventListener('click', function (e) {
    inputForm.reset()
    inputFocus.focus()
  })
})