import help from './helper.js'
document.addEventListener('DOMContentLoaded', function (e) {
  document.getElementById('page-heading').innerHTML="Allocate Raw Material"
  document.getElementById('staticBackdropLabel').innerHTML="Allocate Raw Material"
  const myModal=document.getElementById('staticBackdrop')
  const Modal=new bootstrap.Modal(document.getElementById('staticBackdrop'), {
    keyboard: false
  })

  const log=console.log;
  const tblName='allocate'; // this is routname and tablename as well
  const btnRefresh=document.getElementById('second-groupbtn')
  const btnShowModal=document.getElementById('first-groupbtn')
  const inputForm=document.getElementById('input-form')
  const inputFocus=document.getElementById('givento')
  const btnSubmit=document.getElementById('submit')
  const btnDelete=document.getElementById('delete')
  const alertBox=document.getElementById('alert-box')
  

  btnShowModal.innerText='Allocate'
  
  myModal.addEventListener('shown.bs.modal', function () {
    inputFocus.focus()
  })

  myModal.addEventListener('show.bs.modal', function () {
    help.getAsList({ sql: help.listSql.material, elementID:'matid' })
    help.getAsList({ sql: help.listSql.contractor, elementID:'givento'})
    inputFocus.focus()
  })

  myModal.addEventListener('hidden.bs.modal', function () {
    inputForm.reset();
    btnSubmit.innerText='Add'
    document.getElementById('delete').classList.add('d-none')
    alertBox.classList.add('d-none')
  })

  // functin to crate or updat party
  async function createUpdate(obj) {
  let { data, dbtable, create } = obj
  if (!data) {return false}
  let url=''
  
  if (create) {
    url=`/api/crud/create/${dbtable}`
  } else {
    data.id = document.getElementById('delid').innerText
    url=`/api/crud/update/${dbtable}`
    }
    // log(url, data)
    // return true
  const result= await help.postData(url, data)
  
  if (result.status=='success') {
    // refresh table
    set_and_refresh_data_table(e)
    return true
  }  
  }
  
  function set_and_refresh_data_table() {
    let obj={
      url: `/api/crud/select/${tblName}`,
    }
    help.set_and_refresh_data_table_test(obj, setRows)
  }
   
  set_and_refresh_data_table()

  btnRefresh.addEventListener('click', function (e) {
    e.preventDefault()
    set_and_refresh_data_table(e)
  })

  // this function eill add enventlistener to table on link id
  function setRows(arr) {
    if (!arr) return
    arr.forEach(r => {
      r.addEventListener('click', async function (e) {
        if (e.target.classList.contains('idcol')) {
          const id=e.target.innerHTML
          let url=`/api/crud/select/query/?sql=SELECT * FROM ${tblName} WHERE id = ${id}`
          const d=await help.getData(encodeURI(url))
          //fill the form fields back with data
          if (d.status==='ok') {
            const data=d.rs[0]
            // log(data, id)
            Modal.show();
            btnSubmit.innerText = 'Update'
            btnDelete.classList.remove('d-none')
            document.getElementById('delid').innerText=id
            data.matid===null?'':document.getElementById('matid').value=await help.getName(data.matid)+' / '+ data.matid
            data.cntr_id===null?'':document.getElementById('givento').value=await help.getName(data.cntr_id)+' / '+ data.cntr_id
            data.qty_given===null?'':document.getElementById('unitsgiven').value=data.qty_given
            data.given_on===null?'':document.getElementById('purchon').value= moment(data.given_on).format('YYYY-MM-DD')
            data.comments===null?'':document.getElementById('cmnts').value=data.comments
            // document.getElementById('unitsavl').value=data.unit_type
          }
        }
      })
    })
  }

  // button to create new allocation 
  btnSubmit.addEventListener('click', async function (e) {   
    e.preventDefault();
    const data=help.formDataToJson(new FormData(inputForm))
    data.givento = help.getPureValue(data.givento)// data.givento?data.givento.split('/')[1].trim():'' // contractor id
    data.matid = help.getPureValue(data.matid) // data.matid?data.matid.split('/')[1].trim():''  // material id
    data.unitsgiven= data.unitsgiven?data.unitsgiven: 0
    data.purchon= data.purchon? moment().format('YYYY/MM/DD'):null
    
    if (data.givento===''||data.matid===''||data.unitsgiven==='') {
      // alert(help.titleCase('all required fields are must to allocate'))
      alertBox.classList.remove('d-none')
      alertBox.innerText = help.titleCase('all required fields are must to allocate units')
      return 
    }

    if (this.innerText.toLocaleLowerCase()==='add') {
      //create new
      result= await createUpdate({ data, dbtable: tblName, create:true })
    } else {
      //update
      result=await createUpdate({ data, dbtable: tblName, create: false })
    }
    //take astion as per result
    if (result) {
      inputForm.reset()
      Modal.hide();
    } else {
      //show alrt
    }
  })

  const material=document.getElementById('matid')
  material.addEventListener('input', async function () {
    let matid=help.getPureValue(this.value)
    let sql = `select x.au from ( select m.matid, m.qty_purchased - a.ug as au from material m left join (select matid, sum(qty_given) ug from allocate group by matid) a on m.matid = a.matid ) x where x.matid = '${matid}'`
    let r=await help.queryResult(sql)
    document.querySelector('#unitsavl').value = r.au   
  })


  //deltet line
  btnDelete.addEventListener('click', async function (e) {
    const answer =confirm("Are you Sure want to delete this Material?");
    const delid=parseInt(document.getElementById('delid').innerText)
    if (answer) {
      const url='/api/crud/delete/allocate'
      const data={ id: delid }
      let rs=await help.postData(url, data)
      if (rs.status==='success') { //rs.status==='success'
        if (rs.rs.length>0) {
          alertBox.classList.remove('d-none')
          alertBox.innerText = String(rs.rs).split('\n')[0] //'raj shekhar singh' //rs.rs.error
        } else {
          inputForm.reset()
          Modal.hide();
          // set_and_refresh_data_table(e, 'material')
          set_and_refresh_data_table()
        }
      } 
    } 
  })
})