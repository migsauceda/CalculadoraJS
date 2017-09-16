var Tecla= document.getElementsByClassName('tecla')
var i= 0
for(i= 0; i < Tecla.length; i++){
    Tecla[i].addEventListener('click', function(){alert(Tecla[i].id)})
}
function OperarTecla(id){
  alert(id)
}
