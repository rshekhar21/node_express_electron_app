import help from './helper.js'
document.addEventListener('DOMContentLoaded', function (e) {
  help.setPage({title: 'Unit-Details'})
  const tblName='orderitems';
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
    e.preventDefault()
    const url=`/api/crud/select/${tblName}`
    const data=await help.getData(url)
    const prams={
      data,
      linkcell: 'id',
    }
    const arr = await help.setTable(prams) //data, 'my-table', 'cntr_id'
    
    // add envent listen to table link
    // arr.forEach(r => {
    //   r.addEventListener('click', async function (e) {
    //     if (e.target.classList.contains('idcol')) {
    //       const id = e.target.innerHTML
    //       let url=`/api/crud/select/query/?sql=SELECT * FROM ${tblName} WHERE id =${id}`
    //       const d=await help.getData(encodeURI(url))
    //       //fill the form fields back with data
    //       if (d.status==='ok') {
    //         const data=d.rs[0]
    //         document.getElementById('mname').value=data.material_name
    //         document.getElementById('mcode').value=data.mcode
    //         document.getElementById('unitype').value=data.unit_type
    //         document.getElementById('unitcost').value=data.unit_cost
    //         document.getElementById('qtypurch').value=data.qty_purchased
    //         document.getElementById('purchcost').value=parseInt(data.purch_cost)
    //         document.getElementById('unitsgiven').value=data.units_given
    //         document.getElementById('cmnts').value=data.cmnts
    //         document.getElementById('supplier').value=data.supplier
    //         document.getElementById('delid').value=id
    //         document.getElementById('cmnts').value=data.comments
    //         document.getElementById('uuid').value=data.matid
    //         btnSubmit.innerText = 'Update'
    //         btnDelete.classList.remove('d-none')
    //         Modal.show();
    //         document.getElementById('purchon').value= moment(data.purchon).format('YYYY-MM-DD')
    //         document.getElementById('givento').value=await help.getName(data.given_to)+' / '+data.given_to
    //       }
    //     }
    //   })
    // })
  }

  set_and_refresh_data_table(e)
})