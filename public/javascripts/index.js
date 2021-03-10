const optionsDisquette = {
    strings: ['T tro bo lazare'],
    typeSpeed: 25
  }
  

document.addEventListener("DOMContentLoaded", function(event) {
    
  new Typed('.disquette-text', optionsDisquette);

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
    gender: $('form').serializeArray()[0].value
  }

}