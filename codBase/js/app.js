//variables globales para operandos, operadores, Resultado
var Operando1, Operando2
var Operador
var Resultado
var Estado
var TipoLeido
var Leido

//inicializa
Operando2= 0

//identifica las teclas o botones de la calculadora
var Tecla= document.getElementsByClassName('tecla')

//asigna el evento clic a cada tecla identificada en la variable Tecla[]
for(var i= 0; i < Tecla.length; i++){
  document.getElementById(Tecla[i].id).onclick= OperarTecla;
}

/*
==============================================================================

==============================================================================
*/
//hace lo correspondiene con la tecla que recibio el evento click
function OperarTecla(pEvento){
  var evento= pEvento;

  //lo que se tecleo
  Leido= document.getElementById(evento.currentTarget.id).id

  EvaluarEstados(Leido)
}

/*
==============================================================================

==============================================================================
*/
function EvaluarEstados(Leido){
  //el estado inicial
  if (Estado== undefined){
    Estado= "eEspera"
  }

  //saber que leyo: digito u operador
  if (Leido >= 0 && Leido <= 9){
    TipoLeido= "digito"
  }
  else{
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
      TipoLeido= "operador"
  }

  //control de estados
  switch (Estado) {
    case "eEspera": //0
      if (TipoLeido== "digito"){
        Estado= "eOperando1"
        Operando1= Leido
        document.getElementById("display").innerHTML = Operando1
      }
      break;

    case "eOperando1": //1
      if (TipoLeido== "digito"){
        Operando1+= Leido
        document.getElementById("display").innerHTML = Operando1
      }
      else if (TipoLeido== "operador"){
        Estado= "eOperador"
      }
      break;

    case "eOperador": //2
      if (TipoLeido== "digito"){
        Estado= "eOperando2"
        Operando2+= Leido
        document.getElementById("display").innerHTML = Operando2
      }
      break;

    case "eOperando2": //3
      if (TipoLeido== "digito"){
        Operando2+= Leido
        document.getElementById("display").innerHTML = Operando2
      }
      else if (TipoLeido== "Operador"){
        Estado= "eOperador"
        RealizarCalculo()
      }
      else if (TipoLeido== "igual"){
        Estado= "igual"
        RealizarCalculo()
      }
      break;

    case "eIgual":  //4
      if (TipoLeido== "Operador"){
        Estado= "eOperador"
        RealizarCalculo()
      }
      break;

    default:

  }
}

/*
==============================================================================

==============================================================================
*/
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
}
