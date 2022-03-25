// import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'
let nanoid=(t=21) => { let e="", r=crypto.getRandomValues(new Uint8Array(t)); for (; t--;) { let n=63&r[t]; e+=n<36? n.toString(36):n<62? (n-26).toString(36).toUpperCase():n<63? "z":"Z" } return e };

const log=console.log

function uuid(length=4) {
  return nanoid(length).toLocaleLowerCase().trim()
}

async function getName(id) {
  // let tables={
  //   m: 'material',
  //   n: 'party',
  //   p: 'product'
  // }
  log(id, id[0])
  let sql=''
  if (id[0]==='n') sql=`select fullname name from party where id ='${id}'`
  if (id[0]==='m') sql=`select material_name name from material where matid ='${id}'`
  if (id[0]==='p') sql=`select product_name name from product where prod_id ='${id}'`
  
  let url=`/api/crud/select/query/?sql=${sql}`
  // log(url)
  try {
    let rs=await getData(url)
    return rs.rs[0].name
  } catch (error) {
    return 'na'
  }

}

function formDataToJson(fd) {
  let object={};
  for (let key of fd.keys()) {
    object[key]=fd.get(key);
  }
  return object;
}

function titleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase()+txt.substr(1).toLowerCase();
  });
}

function isEmail(email) {
  var reg=/^([A-Za-z0-9._-])+\@([A-Za-z0-9._-])+\.([A-Za-z]{2,4})$/;
  return reg.test(email);
}

async function postData(url, data) {
  if (!url||!data) return false;
  // log(data)
  let req=new Request(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  try {
    let res=await fetch(req);
    let result=await res.json();
    return result;
  } catch (error) {
    return error;
  }
}

async function getData(url) {
  try {
    let res=await fetch(url);
    let data=await res.json();
    return data;
  } catch (error) {
    return error;
    // log(error);
  }
}

async function set_and_refresh_data_table_test(obj, callback) {
  let { url, linkcell='id', thead=true, tableId='my-table' }=obj  
  const data=await getData(url)
  const prams={
    data,
    linkcell,
    thead,
    tableId
  }
  log(prams)
  const arr=await setTable(prams)
  if (callback) callback(arr);
}

//  data, tblid='my-table', linkcell='id'
async function setTable(prams) {  
  let { data, linkcell, thead=true, tableId='my-table' }=prams
  // log(tableId)
  // return
  const table=document.getElementById(tableId)
  if (data.status==='ok') {
    table.innerHTML=''

    // append table head if required
    if (thead) {
      let tr=document.createElement("tr");
      const thead=document.createElement("thead");
      for (let key in data.rs[0]) {
        // console.log(data.rs[0][key]); // this will give the valu of the field
        // console.log(key.toUpperCase())
        let th=document.createElement("th");
        th.setAttribute("scope", "col");
        th.innerHTML=key.toUpperCase(); // key is the title of the filed
        tr.appendChild(th);
        thead.appendChild(tr);
        table.appendChild(thead);
      }
    }    

    // append rows
    const tbody=document.createElement("tbody");
    tbody.id='tbody'
    for (let value of data.rs.keys()) {
      let tr=document.createElement("tr");
      for (let key in data.rs[value]) {
        let td=document.createElement("td");
        td.innerHTML=data.rs[value][key];
        if (key===linkcell) {
          // td.innerHTML = `<a href="#" class="link-primary idcol pe-none">${data.rs[value][key]}</a>`
          td.setAttribute('role', 'button')
          td.className=('text-primary idcol')
          td.innerHTML=data.rs[value][key]
        }
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }

    table.appendChild(tbody);
    return Array.from(tbody.rows)
  } else {
    table.innerHTML = ''
  }
}

async function generateTable(prams) {

}

//data, colid, url, colindex=0, inputvals=[]
async function loadModal(prams) {
  const { data, cloid, url, colindex, inputname, fieldname }=prams
  // const arr=await help.setTable()
  arr.forEach(r => {
    r.addEventListener('click', async function (e) {
      if (e.target.classList.contains('idcol')) {
        const data=await help.getData(encodeURI(url))
        if (data.status==='ok') {
          const data=data.rs[colindex]
          inputvals.forEach(c => {
            document.getElementById(c).value=data.c
          })
          Modal.show();
        }
      }
    })
  })
}


function sqlDate(date=new Date(), dlimiter='/') { 
  (date===null||date===''||!date)?date = new Date():date
  return  dlimiter==='/'? moment(date).format('YYYY/MM/DD'):moment(date).format('YYYY-MM-DD')
}

//custom function
let listSql={
  // always keep the returned colum name as name 
  supplier: `SELECT p.fullname as name FROM party p WHERE p.ptype = 'Supplier' ORDER BY p.id`
  , contractor: `SELECT CONCAT(p.fullname, ' / ', p.party) as name FROM party p WHERE p.ptype = 'Contractor' ORDER BY P.id`
  , product: `SELECT CONCAT(p.product_name, ' / ', p.prod_id) as name FROM product p`
  , material: `SELECT CONCAT(m.material_name, ' / ', m.matid) as name FROM material m`
}

async function getAsList(obj) { //sql, elementID = '', asDataList = false, dataListID = ''
  const { sql, elementID, asDataList, dataListID }=obj
  let url=`/api/crud/select/query/?sql=${sql}`
  let data=await getData(url)
  // log(url)
  if (data.rs) {
    if (!asDataList) {
      const selectBox=document.getElementById(elementID)
      selectBox.innerHTML=null
      let newOption=new Option('', '');
      selectBox.add(newOption, undefined);
      // selectBox.add(<option value=""></option>)
      let options
      data.rs.forEach(function (item) {
        options=document.createElement('option')
        options.value=item.name
        options.innerText=item.name
        selectBox.add(options)
      });
    } else {
      const datalist=document.getElementById(dataListID)
      datalist.innerHTML=null
      let options
      data.rs.forEach(function (item) {
        options=document.createElement('option')
        options.value=item.name
        datalist.appendChild(options)
      })
    }
  }
}

function getPureValue(string, side=1, dlimiter='/') {
  if (String(string).includes('/')) {
    return String(string).split(dlimiter)[side].trim()
  } else {
    return string
  }
}



function setPage(obj) {
  let { title }=obj
  document.getElementById('page-heading').innerHTML=title
}

async function queryResult(sql) {
  let url=`/api/crud/select/query/?sql=${sql}`
  let data=await getData(url)
  if (data.status==='ok') {
    return data.rs[0]
  }
}


export default {
  formDataToJson,
  titleCase,
  isEmail,
  postData,
  getData,
  nanoid,
  setTable,
  sqlDate,
  getAsList,
  loadModal,
  uuid,
  getName,
  listSql,
  generateTable,
  getPureValue,
  set_and_refresh_data_table_test,
  setPage,
  queryResult, 
  test: ()=>alert('ok')
}



// window.location.href = "/app/contractor"


/* assuming we have the following HTML
<select id='s'>

</select>
*/

// var s = document.getElementById('s');
// var options = [Four, Five, Six];

// options.forEach(function(element,key) {
//     s[key] = new Option(element,key);
// });