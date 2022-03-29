import help from './helper.js'
document.addEventListener('DOMContentLoaded', function (e) {
  help.setPage({
    title: help.titleCase('database / tables setup'),
    firstButtonName: 'Setup Databse',    
  })

  const log=console.log
  const doc=document;
  const dbname='ebook';

  const btnSubmit=document.getElementById('submit')
  const entryForm=document.getElementById('entry-form')
})