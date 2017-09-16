var Tecla= document.getElementsByClassName('tecla')

for(var i= 0; i < Tecla.length; i++){
    Tecla[i].addEventListener('click', OperarTecla())
}
function OperarTecla(){
  alert("hacer tecla as grande ")
}
