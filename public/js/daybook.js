import help from './helper.js'
document.addEventListener('DOMContentLoaded', function () {
  help.setPage({
    title: help.titleCase('day book entry'),
  })

  const log=console.log
  const doc=document;
  const tblName='daybook';

  const btnSubmit=document.getElementById('submit')
  const entryForm=document.getElementById('entry-form')
  const btnDelete=document.getElementById('delete')
  const alertBox=document.getElementById('alert-box')

  const myModal=document.getElementById('staticBackdrop')
  const Modal=new bootstrap.Modal(document.getElementById('staticBackdrop'), {
    keyboard: false
  })

  myModal.addEventListener('hidden.bs.modal', function () {
    entryForm.reset();
    btnSubmit.innerText='Add'
    document.getElementById('delete').classList.add('d-none')
    document.getElementById('alert-box').classList.add('d-none')
    // document.getElementById('ptype').disabled =false
  })


  myModal.addEventListener('show.bs.modal', function (e) {    
    let sql = `select concat(fullname, ' / ', party) as name from party order by fullname asc;`    
    help.getAsList({ sql, asDataList: true, dataListID: 'party-list'
    })
    doc.getElementById('edate').value=help.sqlDate(null,'-')
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
          let sql=`select * from ${tblName} where id=${id}`
          let url=`/api/crud/select/query/?sql=${sql}`
          let data=await help.getData(url)
          if (data.rs.length>0) {
            const d=data.rs[0]
            Modal.show();
            btnSubmit.innerText = 'Update'
            btnDelete.classList.remove('d-none')
            document.getElementById('delid').innerText=id
            document.getElementById('party').value= d.party?d.fullname + ' / ' + d.party:d.fullname
            document.getElementById('edate').value=help.sqlDate(d.entry_date,'-')
            document.getElementById('amtpaid').value=d.amt_paid
            document.getElementById('received').value=d.amt_received
            document.getElementById('pmode').value=d.pymt_mode
            document.getElementById('comments').value=d.narraction
          }
        })
      })
    }    
  }

  refreshTable();

  
  btnSubmit.addEventListener('click', async function (e) {
    e.preventDefault()
    const data=help.formDataToJson(new FormData(entryForm))
    let party=data.party
    if (String(party).includes('/')) {
      data.name=help.getPureValue(party, 0)
      data.party=help.getPureValue(party)
    } else {
      data.party=null;
      data.name=party;
    }
    

    if (!data.name) {
      // alertBox.classList.remove('d-none')
      // alertBox.append(help.titleCase('party name is must to create entry'))
      alert(help.titleCase('party name is must to create entry'))
      return false
    }
    data.amtpaid=data.amtpaid? +data.amtpaid:0;
    data.received=data.received? +data.received:0;
    if (data.amtpaid===0 && data.received===0) {
      alert(help.titleCase('entry must have any amount mentined!'))
      return false
    }

    data.edate=help.sqlDate(data.edate)
    
    let obj = {data, tblName}
    if (this.innerHTML!=='Add') obj.create=false
    let res=await help.createOrUpdateTable(obj)
    if (res) {
      Modal.hide()
      refreshTable()
    }

  })
  

  btnDelete.addEventListener('click', async function (e) {
    const answer =confirm("Are you Sure want to delete this Entry?");
    const id=+document.getElementById('delid').innerText
    if (answer) {
      const url='/api/crud/delete/'+ tblName
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