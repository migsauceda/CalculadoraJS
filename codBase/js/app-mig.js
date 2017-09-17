/* 1547
Saber cuando se hace click en cada una de las teclas
Identificar la tecla para luego saber que hacer
*/

//variables globales para operandos, operadores, Resultado
var Operando1, Operando2
var Operador
var Resultado
var Estado //saber el estaod de la calculadora: espera, operando
var Leido  //que tecla se leyo

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
      //si ya se recibio un numero valido y entonces esta en estao eOperando1
      if (Estado== "eOperando1"){
        if (Operando1 == "0"){
          //si la pantalla de la calculadora esta en valor cero: se sobreescribe
          Operando1 = Leido
        }
        else{
          Operando1 += Leido
        }
      }

      //se recibe el proximo operando
      if (Estado== "eOperando2" || Estado== "eOperando3"){
        if (Operando2 == 0){
          Operando2 = Leido
        }
        else{
          Operando2 += Leido
        }
        Estado= "eOperando3"
      }
    } //fin else "undefined"

    if (Estado== "eOperando1"){
      document.getElementById("display").innerHTML = Operando1
    }
    if (Estado== "eOperando2" || Estado== "eOperando3"){
      document.getElementById("display").innerHTML = Operando2
    }
  } //fin si leyo un numero

  //si se leyo un Operador
  switch (Leido){
    case "dividido":
      Operador= "/"
      break;
    case "por":
      Operador= "*"
      break;
    case "menos":
      Operador= "-"
      break;
    case "mas":
      Operador= "+"
      break;
    }
    if (Estado== "eOperando1" || Estado== "eOperando3" || Estado== "eOperando4")
        && (Operador != undefined){
      Estado= "eOperando2"
    }

  //si se leyo la tecla igual, se hace la operacion respectiva
  if (Leido== "igual"){
    RealizarCalculo();
  }
} //funcion operar tecla

//=============================================================================
function RealizarCalculo(){
  switch (Operador){
    case "/":
      if (Number(Operando2) <= 0){
        Resultado= "Error"
      }
      else{
        Resultado= Number(Operando1) / Number(Operando2)
      }

      break;
    case "*":
      Resultado= Number(Operando1) * Number(Operando2)

      break;
    case "-":
      Resultado= Number(Operando1) - Number(Operando2)

      break;
    case "+":
      Resultado= Number(Operando1) + Number(Operando2)

      break;
    }
    document.getElementById("display").innerHTML = Resultado
    Operando1= Resultado
}  //fin realizar calculo

//asigna el evento clic a cada tecla identificada en la variable Tecla[]
for(var i= 0; i < Tecla.length; i++){
  document.getElementById(Tecla[i].id).onclick= OperarTecla;
}
