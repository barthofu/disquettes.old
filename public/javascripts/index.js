let typed

const optionsDisquette = {
    strings: [''],
    typeSpeed: 25
}
  

document.addEventListener("DOMContentLoaded", function(event) {
    
  typed = new Typed('.disquette-text', optionsDisquette);

});

$(document).ready(() => {

  $(".tag .value").select2({
    tags: false,
    tokenSeparators: [',', ' ']
  })

  $(".age .value").select2({
    tags: false,
    tokenSeparators: [',', ' ']
  })

})


function getData() {

  let obj = {
    tag: $('.tag .value').find(':selected').val(),
    age: $('.age .value').find(':selected').val(),
    genre: $('form').serializeArray()[0].value
  }

  fetch(new Request(`/api/get?${Object.keys(obj).map(key => `${key}=${obj[key]}`).join('&')}`))
    .then(res => res.json()).then(disquette => {

      typed.destroy()

      typed = new Typed('.disquette-text', {
        strings: disquette.result.disquette,
        typeSpeed: 25
      });
    })

}