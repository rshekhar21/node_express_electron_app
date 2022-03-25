import help from './helper.js'
  document.addEventListener('DOMContentLoaded', function (e) {
  document.getElementById('page-heading').innerHTML="Raw Material"

  const myModal=document.getElementById('staticBackdrop')
  const Modal=new bootstrap.Modal(document.getElementById('staticBackdrop'), {
    keyboard: false
  })
  const log=console.log
  const tblName = ['material', 'allocate']
  const btnSubmit=document.getElementById('submit')
  const btnRefresh=document.getElementById('second-groupbtn')
  const inputForm=document.getElementById('input-form')
  const inputFocus=document.getElementById('mname')
  const btnReset=document.getElementById('resetForm')
  const btnDelete=document.getElementById('delete')
  const alertBox=document.getElementById('alert-box')
  
  document.getElementById('staticBackdropLabel').innerHTML = "Create Raw Material"
  // function modal set-focus
  myModal.addEventListener('shown.bs.modal', function () {
    inputFocus.focus()
  })

  myModal.addEventListener('show.bs.modal', function () {
    help.getAsList({sql:help.listSql.contractor, elementID:'givento'})
    help.getAsList({sql: help.listSql.supplier, asDataList: true, dataListID: 'existing' })    
    inputFocus.focus()
  })

  myModal.addEventListener('hidden.bs.modal', function () {
    inputForm.reset();
    btnSubmit.innerText='Add'
    document.getElementById('delete').classList.add('d-none')
    alertBox.classList.add('d-none')
    document.getElementById('unitsgiven').disabled =false
    document.getElementById('givento').disabled =false
  })

  //functin refresh table and data
  async function set_and_refresh_data_table(e) {
    e.preventDefault()
    const url=`/api/crud/select/${tblName[0]}`
    const data=await help.getData(url)
    const prams={
      data,
      linkcell: 'id',
    }
    const arr = await help.setTable(prams) //data, 'my-table', 'cntr_id'
    // add envent listen to table link
    if (!arr) return
    arr.forEach(r => {
      if (!arr) {
        // set_and_refresh_data_table(e)
        return
      }
      r.addEventListener('click', async function (e) {        
        if (e.target.classList.contains('idcol')) {
          const id = e.target.innerHTML
          let url=`/api/crud/select/query/?sql=SELECT * FROM ${tblName[0]} WHERE id =${id}`
          const d=await help.getData(encodeURI(url))
          if (d.status==='ok') {
            const data=d.rs[0]
            // log(data, data.purchased_on)
            //fill the form fields back with data
            Modal.show();
            btnSubmit.innerText = 'Update'
            btnDelete.classList.remove('d-none')
            document.getElementById('mname').value=data.material_name
            document.getElementById('mcode').value=data.mcode
            document.getElementById('unitype').value=data.unit_type
            document.getElementById('unitcost').value=data.unit_cost
            document.getElementById('qtypurch').value=data.qty_purchased
            document.getElementById('purchcost').value=parseInt(data.purch_cost)
            // document.getElementById('unitsgiven').value=data.units_given
            document.getElementById('unitsgiven').disabled =true
            document.getElementById('givento').disabled =true
            document.getElementById('cmnts').value=data.cmnts
            document.getElementById('supplier').value=data.supplier
            document.getElementById('delid').value=id
            document.getElementById('cmnts').value=data.comments
            document.getElementById('uuid').value=data.matid
            document.getElementById('purchon').value= data.purchased_on?moment(data.purchased_on).format('YYYY-MM-DD'):null
            // document.getElementById('givento').value=await help.getName(data.given_to)+' / '+data.given_to
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
    data.matid='m_'+help.uuid()
    data.givento? data.givento=data.givento.split('/')[1].trim():data.givento=null  // contractor id
    data.purchon? data.purchon=moment().format('YYYY/MM/DD'):data.purchon = null
    if (!data.mname || !data.unitype || !data.unitcost) {
      alert('Material Name, UnitType, UnitCost is Must to Add Material')
      return false
    }    
    
    let url=''
   
    if (obj.create) {
      url=`/api/crud/create/${tblName[0]}`
    } else {
      url=`/api/crud/update/${tblName[0]}`
      data.id=obj.id
      // log(data)
    }

    const result=await help.postData(url, data)
    if (result.status=='success') {
      if (data.givento) {
        url=`/api/crud/create/${tblName[1]}`
        await help.postData(url, data)
        inputForm.reset()
      }      
      // Modal.hide();
    } else {
      //show alert 
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
    const answer =confirm("Are you Sure want to delete this Material?");
    const delid=parseInt(document.getElementById('delid').value)
    if (answer) {
      const url='/api/crud/delete/material'
      const data={ id: delid }
      let rs=await help.postData(url, data)
      if (rs.status==='success') { //rs.status==='success'
        if (rs.rs.length>0) {
          alertBox.classList.remove('d-none')
          alertBox.innerText = String(rs.rs).split('\n')[0] //'raj shekhar singh' //rs.rs.error
        } else {
          // set_and_refresh_data_table(e, 'material')
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