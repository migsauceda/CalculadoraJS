/* 1547
Saber cuando se hace click en cada una de las teclas
Identificar la tecla para luego saber que hacer
*/

//variables globales para operandos y peradores y Resultado
var Operando1, Operando2
var Operador
var Resultado
var Estado //saber el estaod de la calculadora: espera, operando
var Leido

//identifica las teclas
var Tecla= document.getElementsByClassName('tecla')

//hace lo correspondiene con la tecla que recibio el evento click
function OperarTecla(pEvento){
  var evento= pEvento;

  //lo que se tecleo
  Leido= document.getElementById(evento.currentTarget.id).id

  //si se leyo un numero
  if (Leido >= 0 && Leido <= 9){
    //si la calculadora esta en espera
    if (Estado== undefined) {
        Operando1 = String(Leido)
        Operando2 = 0

        Estado= "eOperando1"
    }
    else{
      if (Estado== "eOperando1"){
        if (Operando1 == "0"){
          Operando1 = Leido
        }
        else{
          Operando1 += Leido
        }
      }

      if (Estado== "eOperando2"){
        if (Operando2 == 0){
          Operando2 = Leido
        }
        else{
          Operando2 += Leido
        }
      }
    }

    if (Estado== "eOperando1"){
      document.getElementById("display").innerHTML = Operando1
    }
    if (Estado== "eOperando2"){
      document.getElementById("display").innerHTML = Operando2
    }
  }

  //si se leyo un Operador
  if (Estado== "eOperando1"){
    switch (Leido){
      case "dividido":
        Operador= "/"
        Estado= "eOperando2"
        break;
      case "por":
        Operador= "*"
        Estado= "eOperando2"
        break;
      case "menos":
        Operador= "-"
        Estado= "eOperando2"
        break;
      case "mas":
        Operador= "+"
        Estado= "eOperando2"
        break;
      }
  }

  //si se leyo la tecla igual
  if (Leido== "igual"){
    switch (Operador){
      case "/":
        if (Number(Operando2) <= 0){
          Resultado= "Error"
        }
        else{
          Resultado= Number(Operando1) / Number(Operando2)
        }
        Estado= "undefined"
        break;
      case "*":
        Resultado= Number(Operando1) * Number(Operando2)
        Estado= "undefined"
        break;
      case "-":
        Resultado= Number(Operando1) - Number(Operando2)
        Estado= "undefined"
        break;
      case "+":
        Resultado= Number(Operando1) + Number(Operando2)
        Estado= "undefined"
        break;
      }
      document.getElementById("display").innerHTML = Resultado
  }
} //funcion operar tecla

//asigna el evento clic a cada tecla identificada en la variable Tecla[]
for(var i= 0; i < Tecla.length; i++){
  document.getElementById(Tecla[i].id).onclick= OperarTecla;
}
