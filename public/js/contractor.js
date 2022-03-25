import help from './helper.js'
document.addEventListener('DOMContentLoaded', function (e) {
  document.getElementById('page-heading').innerHTML="Contractor"

  const myModal=document.getElementById('staticBackdrop')
  const Modal=new bootstrap.Modal(document.getElementById('staticBackdrop'), {
    keyboard: false
  })

  const log=console.log
  const tblName = 'contractor'
  const btnSubmit=document.getElementById('submit')
  const btnRefresh=document.getElementById('second-groupbtn')
  const inputForm=document.getElementById('input-form')
  const inputFocus=document.getElementById('name')
  // const btnUpdate=document.getElementById('updateParty')
  const btnReset=document.getElementById('resetForm')
  const btnDelete=document.getElementById('delete')
  const alertBox=document.getElementById('alert-box')

  document.getElementById('staticBackdropLabel').innerHTML = "Create Contractor"

  // function modal set-focus
  myModal.addEventListener('shown.bs.modal', function () {
    inputFocus.focus()
  })
  myModal.addEventListener('show.bs.modal', function () {
  })

  myModal.addEventListener('hidden.bs.modal', function () {
    inputForm.reset();
    btnSubmit.innerText='Add'
    document.getElementById('delete').classList.add('d-none')
    alertBox.classList.add('d-none')
  })
  

  //functin refresh table and data
  async function set_and_refresh_data_table(e) {
    e.preventDefault()
    const url=`/api/crud/select/${tblName}`
    const data=await help.getData(url)
    const prams={
      data,
      // tblid: 'my-table',
      linkcell: 'id',
    }
    const arr = await help.setTable(prams) //data, 'my-table', 'cntr_id'
    if (arr.length===0) {
      inputForm.reset();
      return 
    } 
    // add envent listen to table link
    arr.forEach(r => {
      r.addEventListener('click', async function (e) {
        if (e.target.classList.contains('idcol')) {
          const id = e.target.innerHTML
          let url=`/api/crud/select/query/?sql=SELECT * FROM party WHERE id =${id}`
          const d=await help.getData(encodeURI(url))
          if (d.status==='ok') {
            const data=d.rs[0]
            log(data)
            document.getElementById('name').value=data.fullname
            document.getElementById('contact').value=data.contact
            document.getElementById('email').value=data.email
            document.getElementById('delid').value=id
            document.getElementById('refby').value=data.refby
            document.getElementById('comments').value=data.comments
            if (data.credit>0) {
              document.getElementById('balance').value=data.credit
              document.getElementById('baltype').value= 'To Receive'
            } else if (data.debit > 0) {
              document.getElementById('balance').value=data.debit
              document.getElementById('baltype').value= 'To Pay'
            }
            document.getElementById('bdate').value=data.bdate? help.sqlDate(data.bdate, '-'):null
            // alert(help.sqlDate(data.bdate, '-'))
            // btnUpdate.disabled = false;
            btnSubmit.innerText = 'Update'
            btnDelete.classList.remove('d-none')
            Modal.show();
          }
        }
      })
    })
  }

  // cal function to refresh
  set_and_refresh_data_table(e)

   // functin to crate or updat party
  async function createUpdate(obj) {     
    const data=help.formDataToJson(new FormData(inputForm))
    data.ptype='Contractor'
    data.party='n_'+ help.uuid()
    data.regdate= help.sqlDate()//moment().format('YYYY/MM/DD')
    data.bdate ? data.bdate=help.sqlDate(data.bdate): data.bdate=null

    if (data.balance===''||data.balance===0) {
      data.balance=0
      data.baltype=null
      data.bdate=null
    }

    if (data.baltype==='Pay') data.debit=data.balance
    if (data.baltype==='Receive') data.credit=data.balance

    if (help.email&&!help.isEmail(data.email)) {
      alert('Invalid Email ID '+data.email)
      return false
    }
    if (!data.name) {
      alert('Contractor Name is Required to Add!')
      return false
    }
    
    let url=''

    if (obj.create) {
      url='/api/crud/create/party'
    } else {
      url='/api/crud/update/party'
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

 
  // refresh button click function
  btnRefresh.addEventListener('click', async function (e) {
    set_and_refresh_data_table(e)
  })

  //deltet line
  btnDelete.addEventListener('click', async function (e) {
    const answer =confirm("Are you Sure want to delete this Party?");
    const delid=parseInt(document.getElementById('delid').value)
    if (answer) {
      const url='/api/crud/delete/party'
      const data = {id: delid}
      let rs=await help.postData(url, data)
      if (rs.status==='success') { //rs.status==='success'
        // alert('Party Deleted Successfully!')
        // location.reload(true)
        // console.log(rs.rs, rs.rs.length)
        if (rs.rs.length>0) {
          alertBox.classList.remove('d-none')
          alertBox.innerText = String(rs.rs).split('\n')[0] //'raj shekhar singh' //rs.rs.error
        } else {
          Modal.hide();
          set_and_refresh_data_table(e)
        }
      } 
    } 
  })

  // reset-from button click function
  btnReset.addEventListener('click', function (e) {
    inputForm.reset()
    inputFocus.focus()
  })
  
})
