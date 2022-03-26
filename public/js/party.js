import help from './helper.js'
document.addEventListener('DOMContentLoaded', function (e) {
  help.setPage({
    title: help.titleCase('create new party'),
  })

  const log=console.log
  const doc=document;
  const tblName='party';
  
  const btnSubmit=document.getElementById('submit')
  const partyForm=document.getElementById('party-form')
  const btnDelete=document.getElementById('delete')


  const myModal=document.getElementById('staticBackdrop')
  const Modal=new bootstrap.Modal(document.getElementById('staticBackdrop'), {
    keyboard: false
  })
  myModal.addEventListener('hidden.bs.modal', function () {
    partyForm.reset();
    btnSubmit.innerText='Add'
    document.getElementById('delete').classList.add('d-none')
    document.getElementById('alert-box').classList.add('d-none')
    document.getElementById('ptype').disabled =false
  })

  function refreshTable() {
    let obj={ url: `/api/crud/select/${tblName}` }
    help.set_and_refresh_data_table_test(obj, calback)

    function calback(arr) {
      if (!arr) return;
      arr.forEach(function (r) {
        r.addEventListener('click', async function (e) {
          e.preventDefault();
          const id=e.target.innerText
          let sql=`select * from party where id=${id}`
          let url=`/api/crud/select/query/?sql=${sql}`
          let data=await help.getData(url)
          if (data.rs.length>0) {
            const d=data.rs[0]
            Modal.show();
            btnSubmit.innerText = 'Update'
            btnDelete.classList.remove('d-none')
            document.getElementById('delid').innerText=id
            document.getElementById('ptype').value=d.ptype
            document.getElementById('ptype').disabled =true
            document.getElementById('name').value=d.fullname
            document.getElementById('contact').value=d.contact
            document.getElementById('email').value=d.email
            document.getElementById('refby').value=d.refby
            document.getElementById('pan').value=d.pan_num
            document.getElementById('address').value=d.local_address
            document.getElementById('regdate').value=help.sqlDate(d.reg_date,'-')
            document.getElementById('baldate').value=help.sqlDate(d.bdate, '-')
            document.getElementById('balamt').value= (d.credit || d.debit)
            if(d.credit!=='0')document.getElementById('baltype').value= 'Receive'
            if(d.debit!=='0')document.getElementById('baltype').value= 'Pay'
            document.getElementById('comments').value=d.comments
          }
        })
      })
    }    
  }

  refreshTable();


  btnSubmit.addEventListener('click', async function (e) {
    e.preventDefault();
    const data=help.formDataToJson(new FormData(partyForm))
    const uuid=help.nanoid(4)
    if (!data.name) {
      alert('Party Name is Must to Add party')
      return
    }
    if(data.ptype==='Contractor') data.party='n_'+uuid;
    if(data.ptype==='Customer') data.party='c_'+uuid;
    if(data.ptype==='Suppler') data.party='s_'+uuid;
    if(data.ptype==='Employee') data.party='e_'+uuid;

    data.regdate=help.sqlDate(data.regdate);
    data.baldate=help.sqlDate(data.baldate);
    data.credit=0; data.debit=0;
    data.baltype==='Give'? data.debit=Number(data.balamt):data.credit=Number(data.balamt)     
    data.pan=String(data.pan).toUpperCase();

    let obj = {data, tblName: 'party'}
    if (this.innerHTML!=='Add')obj.create = false

    let res = await help.createOrUpdateTable(obj)
    if (res) {
      Modal.hide()
      refreshTable()
    }
  })


  btnDelete.addEventListener('click', async function (e) {
    const answer =confirm("Are you Sure want to delete this Party?");
    const id=+document.getElementById('delid').innerText
    if (answer) {
      const url='/api/crud/delete/party'
      let rs=await help.postData(url, {id})
      if (rs.status==='success') { //rs.status==='success'
        if (rs.rs.length>0) {
          alertBox.classList.remove('d-none')
          alertBox.innerText = String(rs.rs).split('\n')[0] //'raj shekhar singh' //rs.rs.error
        } else {
          Modal.hide();
          refreshTable()
        }
      } 
    } 
  })


})