
document.addEventListener('DOMContentLoaded', (e) => {
  // const navbar = document.querySelector('.nav-item')
  // const navlink=document.querySelectorAll('.nav-link')
  // // log(navbar)
  // navlink.forEach(el => {
  //   el.addEventListener('click', function () {
  //     navbar.querySelector('.active').classList.remove('active')
  //     el.classList.add('active')
  //   })
  // })
  String.prototype.toTitle = function() {
    return this.replace(/(^|\s)\S/g, function(t) { return t.toUpperCase() });
  }
})

