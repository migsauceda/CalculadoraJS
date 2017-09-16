/* 1547
Saber cuando se hace click en cada una de las teclas
Identificar la tecla para luego saber que hacer
*/

//identifica las teclas
var Tecla= document.getElementsByClassName('tecla')

//hace lo correspondiene con la tecla que recibio el evento click
function OperarTecla(pEvento){
  var evento= pEvento;

  alert(evento.currentTarget.id)
}

//asigna el evento clic a cada tecla identificada en la variable Tecla[]
for(var i= 0; i < Tecla.length; i++){
  document.getElementById(Tecla[i].id).onclick= OperarTecla;
}
