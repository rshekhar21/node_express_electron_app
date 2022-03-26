import help from './helper.js'

document.addEventListener('DOMContentLoaded', function (e) {
  document.getElementById('page-heading').innerHTML="Create New Order"
  document.getElementById('staticBackdropLabel').innerHTML="Add Material"

  
  
  const myModal=document.getElementById('staticBackdrop')
  const Modal=new bootstrap.Modal(document.getElementById('staticBackdrop'), {
    keyboard: false
  })
  const log=console.log
  const tblName = ['orders', 'orderitems']
  const btnSubmit=document.getElementById('submit')
  const btnShowModal=document.getElementById('first-groupbtn')  
  const inputForm=document.getElementById('input-form')
  const modalForm=document.getElementById('modal-form')
  const orderForm=document.getElementById('order-form')
  const inputFocus=document.getElementById('material')
  const btnReset=document.getElementById('resetForm')
  const btnDelete=document.getElementById('delete')
  const alertBox=document.getElementById('alert-box')
  const btnExecute=document.getElementById('execute')
  const subHead=document.getElementById('page-subhead')
  const material=document.querySelector('#material')
  const orderTable=document.querySelector('#order-table')
  const tbody=document.getElementById('tbody')
  const btnGroupRight=document.getElementById('btnGroup1')
  const orderId=`o_${help.uuid(5)}`
  const resetOrder=document.getElementById('reset-order')
  const articleCost=document.getElementById('articlecost')
  const allTotal=document.getElementById('alltotal')
  const miscExp=document.getElementById('miscexp')
  const contractor=document.querySelector('#contractor')
  const product=document.querySelector('#product')
  const orderQuantity = document.getElementById('orderqty')
  const orderDate=document.querySelector('#orderdate')
  const updateQty=document.getElementById('orderqty')  
  const btnViewAlocaedList=document.getElementById('second-groupbtn')
  let insertIntoMaterial='';
  let sum=0

  btnViewAlocaedList.innerText = 'View Unit Details'
  btnViewAlocaedList.setAttribute('data-bs-toggle','offcanvas')
  btnViewAlocaedList.setAttribute('data-bs-target','#offcanvasTop')
  btnViewAlocaedList.setAttribute('aria-controls', 'offcanvasTop')

  //data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop"

  var myOffcanvas = document.getElementById('myOffcanvas')
  var bsOffcanvas=new bootstrap.Offcanvas(myOffcanvas)
  
  myOffcanvas.addEventListener('show.bs.offcanvas', function (e) {
    // const contractor=document.querySelector('#contractor').value
    // if (contractor==='') e.preventDefault() 
  })
  myOffcanvas.addEventListener('hide.bs.offcanvas', function (e) {
    document.getElementById('offcanvasTopLabel').innerHTML =''
  })

  
  orderForm.addEventListener('submit', function (e) {
    e.preventDefault();
  })

  const order=[]
  help.getAsList({sql: help.listSql.contractor, elementID:'contractor'})
  help.getAsList({sql: help.listSql.product, elementID: 'product'})
  
  myModal.addEventListener('shown.bs.modal', function () {    
    inputFocus.focus()
  })
  
  myModal.addEventListener('show.bs.modal', function (e) {    
    const contractor=document.querySelector('#contractor').value
    if (contractor==='') e.preventDefault() 
    const cntid=help.getPureValue(contractor)
    let sql = `SELECT CONCAT(m.material_name, ' / ', m.matid) name FROM allocate a LEFT JOIN material m ON a.matid = m.matid WHERE a.cntr_id = '${cntid}' GROUP BY a.cntr_id, m.material_name, m.matid`    
    // log(sql)
    help.getAsList({ sql, asDataList: true, dataListID: 'materialList'
    })    
  })

  myModal.addEventListener('hidden.bs.modal', function () {
    modalForm.reset();
    btnSubmit.innerText='Add'
    document.getElementById('delete').classList.add('d-none')
    alertBox.classList.add('d-none')
  })

  myModal.addEventListener('show.bs.modal', function () {
  })

  btnShowModal.innerHTML='Add Material'
  btnGroupRight.classList.remove('d-none')
  subHead.innerHTML = `OrderID # ( <span class="text-primary" id=order-id>${orderId}</span> )` 

 
  //set unit-type and unit-required in modal form
  material.addEventListener('input', async function (e) {
    let matid=String(e.target.value)
    const contractor=document.querySelector('#contractor').value
    const cntid=help.getPureValue(contractor) // document.getElementById('contractor').value 'n_qzfa'
    if (matid.includes('/')) {
      matid=matid.split('/')[1].trim()
      let sql=`select m.unit_type utype, m.unit_cost ucost from material m where m.matid = '${matid}'`
      // let url=`/api/crud/select/query/?sql=${sql}`
      // let data=await help.getData(url)
      let rs=await help.queryResult(sql)
      // log(rs)
      if (rs) { //data.status==='ok'
        let iv= rs //data.rs[0]
        // let sql=`select qty_used from ( select i.matid , a.qg - sum(i.untsreq_perorder) qty_used from orderitems i left join orders o on i.orderid = o.orderid left join (select matid, sum(qty_given) qg from allocate where cntr_id = '${cntid}' group by matid) a on a.matid = i.matid where o.cntr_id = '${cntid}' group by i.matid, i.untsreq_perorder, a.qg) q where q.matid = '${matid}'`

        let sql = `select qyt_aval from ( select a.matid, a.cntr_id, sum(a.qty_given) units_given, coalesce(s.cunsumed,0) cunsumed, coalesce(sum(a.qty_given),0) - coalesce(s.cunsumed,0) qyt_aval from allocate a left join ( select i.matid, o.cntr_id, sum(i.untsreq_perorder) cunsumed from orderitems i left join orders o on o.orderid = i.orderid group by i.matid, o.cntr_id ) s on a.matid = s.matid where a.cntr_id = '${cntid}' group by a.matid, a.cntr_id, s.cunsumed ) q WHERE q.matid = '${matid}'`
        let url=`/api/crud/select/query/?sql=${sql}`
        // log(sql)
        // let d=await help.getData(url)
        let r=await help.queryResult(sql)
        // log(r)
        let qty = r.qyt_aval // d.rs[0].qyt_aval
        document.getElementById('untavailable').value=+qty // data.rs[0]
        document.getElementById('unitype').value=iv.utype
        document.getElementById('unitcost').value=iv.ucost
        document.getElementById('unitreq').focus();
      }
    }else {
      document.getElementById('unitype').value=''
      document.getElementById('unitcost').value=''
    }  
  })
 
  function resetPage() {    
    btnExecute.disabled=false
    tbody.innerHTML=''
    orderForm.reset()
    const resetOrderId = document.getElementById('order-id')
    resetOrderId.innerText=`o_${help.uuid(5)}`
    miscExp.value=''
    articleCost.innerText='0.00'
    allTotal.innerText='0.00'  
    contractor.value=''
    product.value=''
    orderQuantity.value=''
    orderDate.value=''// help.sqlDate('','-')
  }

  resetOrder.title='Double Click to Reset Order'
  resetOrder.innerText='New Order'
  
  resetOrder.addEventListener('click', function () { //dblclick
    const tblarr=Array.from(tbody.rows)
    if (tblarr.length===0) return false
    const confirmReset=confirm('Set New Order?')
    if (confirmReset) {
      resetPage()
    }
  })

  //set order total
  function setTotal() {
    // const tbody=document.getElementById('tbody')
    const tblarr=Array.from(tbody.rows)
    const odrQty=Number(orderQuantity.value)
    let mexp = Number(miscExp.value)
    let totalCost=0; let ppCost=0;  // ppcost = per piece cost
    tblarr.forEach(function (r) {
      ppCost += Number(r.cells[7].innerText)  //ppcost = per piece cost
      totalCost += Number(r.cells[8].innerText)
    })
    // log(ppCost, totalCost)
    articleCost.innerHTML= (ppCost + (mexp/odrQty)).toFixed(2)
    allTotal.innerHTML= (totalCost + mexp).toFixed(2)
  }

  //alert box function
  function alertMsg(message, type) {
    const alertPlaceholder=document.getElementById('liveAlertPlaceholder')
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    alertPlaceholder.append(wrapper)
  }

   // functin to crate or updat party
  async function createUpdate(obj) {
    let { data, table, create=true } = obj
    if (!data) {return false}
    
    let url=''
    
    if (create) {
      url=`/api/crud/create/${table}`
    } else {
      url=`/api/crud/update/${table}`
      data.id = obj.id
    }
    // log('ok',url,data)

    const result= await help.postData(url, data)
    if (result.status=='success') {
      return true
    }    

    // refresh table
    // set_and_refresh_data_table(e)
  }

  // btnExecute.title = 'Click to Execute Order'
  btnExecute.addEventListener('click', async function () {
    const data={}    
    data.orderId = orderId
    data.odrate= help.sqlDate(orderDate.value)
    data.pcode=help.getPureValue(product.value) 
    data.cntrid= help.getPureValue(contractor.value)
    data.odrqty=Number(orderQuantity.value)
    data.misexp=Number(miscExp.value)
    data.arcost=Number(articleCost.innerText)
    data.allttl=Number(allTotal.innerText)
    data.cmnts=document.getElementById('commentbox').value

    if (orderId===''|| data.pcode===''|| data.cntrid===''|| data.odrqty===''|| data.odrqty===0 ||data.allttl===0) {
      alertMsg('Please Check if all Required Fields are Filled!', 'warning')
      return
    }
    const confirmExecute=confirm('Create Order?')
    if (confirmExecute) {
      //insert order
      let result=await createUpdate({ data, table: tblName[0]})
      if (result) {
        //insert order items
        const tbody=document.getElementById('tbody')
        const tblarr=Array.from(tbody.rows)
        tblarr.forEach(function (r, i) {
          insertIntoMaterial+=`('${orderId}', '${r.cells[1].innerText}','${r.cells[2].innerText}','${r.cells[4].innerText}','${r.cells[5].innerText}','${r.cells[7].innerText}','${r.cells[6].innerText}','${r.cells[8].innerText}'),`
        })
        data.values = String(insertIntoMaterial).slice(0, -1) + ' RETURNING *;'
        log(data.values)
        let result=createUpdate({ data, table: tblName[1]})
        if (result) {
          alertMsg('Order Created Successfully', 'success')
          this.disabled=true
        }
      }
    }
  })  

  // let qty = 0
  updateQty.addEventListener('input', function () {
    let qty = Number(updateQty.value)
    const tbody=document.getElementById('tbody')
    const tblarr=Array.from(tbody.rows)
    
    tblarr.forEach(function (r) {
      r.cells[4].innerText = (Number(r.cells[4].innerText)).toFixed(2)      //cost
      r.cells[6].innerText=Number(r.cells[5].innerText)*qty                 //req/order
      r.cells[7].innerText = (Number(r.cells[7].innerText)).toFixed(2)      //cost/piece
      r.cells[8].innerText=(Number(r.cells[7].innerText)*qty).toFixed(2)    //total
    })
    setTotal()
  })

  
  miscExp.addEventListener('input', function () {
    setTotal()
  })
  
  btnSubmit.addEventListener('click', function (e) {
    e.preventDefault();
    
    const data=help.formDataToJson(new FormData(modalForm))
    // const pcode=help.getPureValue(product.value)     
    
    let { material, unitcost, unitype, unitreq }=data

    const closeButton = '<button type="button" class="btn-close delrow" style="width:4px; height: 4px;" aria-label="Close"></button>'

    unitcost=Number(unitcost)
    unitreq= Number(unitreq)
    
    if (unitcost===0) return false    
    let odrqty=Number(orderQuantity.value)
    let items={}
    items.matid=help.getPureValue(material)
    items.mname=help.getPureValue(material,0)
    items.utype=unitype
    items.ucost=unitcost
    items.unitsreq=unitreq //unit required per order
    items.reqPerOrder=items.unitsreq * odrqty // req per order
    items.costPerArticle=unitcost * unitreq // cost per article
    items.total = items.costPerArticle * odrqty  // total
    // let { matid, mname, utype, ucost, unitsreq, reqPerOrder, costPerArticle, total }=items
    
    order.push(items)

    tbody.innerHTML = ''
    for (let value of order.keys()) {
      let tr=document.createElement("tr");
      let td=document.createElement("td");
      tr.appendChild(td);
      for (let key in order[value]) {
        // log(key)
        let td=document.createElement("td");
        td.innerHTML=order[value][key];
        if (key==='matid') {
          td.innerHTML = `<a href="#" class="link-primary idcol pe-none">${order[value][key]}</a>`
          td.setAttribute('role', 'button')
          td.className=('text-primary idcol')
          td.innerHTML=order[value][key]
        }
        if (key==='total') {
          log(order[value][key].toFixed(2))
          td.innerHTML= order[value][key].toFixed(2) //Number(order[value[key]]).toFixed(2)
        }
        tr.appendChild(td);
      }
      td=document.createElement("td");
      td.innerHTML=closeButton
      tr.appendChild(td);
      tbody.appendChild(tr);
    }

    const tblrow=document.querySelectorAll('.delrow')
    tblrow.forEach(function (r, i) {
      sum= 0
      r.addEventListener('click', function (e) {
        // log(e.target.parentNode.parentNode.rowIndex)
        let ri = e.target.parentNode.parentNode.rowIndex -1 // row index number
        e.target.parentNode.parentNode.remove() // remove clickd row
        order.splice(ri, 1) // remove corresponding row form array
        setTotal()
      })
    })
    setTotal()
    // ottl=order.map(item => item.total).reduce((prev, curr) => prev+curr, 0);
    
    modalForm.reset();
    inputFocus.focus()
  })

  // reset-from button click function
  btnReset.addEventListener('click', function (e) {
    modalForm.reset()
    inputFocus.focus()
  })
  
  btnViewAlocaedList.addEventListener('click', function (e) {
    const cntid=help.getPureValue(contractor.value)
    const cntrName = help.getPureValue(contractor.value, 0) 
    
    let sql=''

    if (cntid.length>0) {
      document.getElementById('offcanvasTopLabel').classList.remove('d-none')
      sql=`select a.cntr_id, concat(p.fullname, ' / ', a.cntr_id) contractor, concat(m.material_name, ' / ', a.matid) material_given, sum(a.qty_given) qty_given, coalesce(q.units_used, 0) ordered_qty, sum(a.qty_given) - coalesce(q.units_used, 0) qty_available from allocate a left join( select o.cntr_id, i.matid, sum(i.untsreq_perorder) units_used from orderitems i left join orders o on o.orderid = i.orderid group by i.matid, o.cntr_id ) q on q.matid = a.matid left join material m on a.matid = m.matid join party p on a.cntr_id = p.party where a.cntr_id = '${cntid}' GROUP by a.matid, a.cntr_id, q.units_used, m.material_name, p.fullname order by a.cntr_id`
      document.getElementById('offcanvasTopLabel').innerText=help.titleCase(`available units with (${cntrName})`) 
    } else {
      // document.getElementById('offcanvasTopLabel').classList.add('d-none')
       document.getElementById('offcanvasTopLabel').innerText=help.titleCase(`available units with all Contractors)`)
      sql=`select a.cntr_id, concat(p.fullname, ' / ', a.cntr_id) contractor, concat(m.material_name, ' / ', a.matid) material_given, sum(a.qty_given) qty_given, coalesce(q.units_used, 0) ordered_qty, sum(a.qty_given) - coalesce(q.units_used, 0) qty_available from allocate a left join( select o.cntr_id, i.matid, sum(i.untsreq_perorder) units_used from orderitems i left join orders o on o.orderid = i.orderid group by i.matid, o.cntr_id ) q on q.matid = a.matid left join material m on a.matid = m.matid join party p on a.cntr_id = p.party GROUP by a.matid, a.cntr_id, q.units_used, m.material_name, p.fullname order by a.cntr_id`
       
    }
    // let sql = cntid.length>0?sql:sql1

    let url=`/api/crud/select/query/?sql=${sql}`
    
    help.set_and_refresh_data_table_test({url, tableId:'table-list'})
  })
 
 })



