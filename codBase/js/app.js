//proyecto final JavaScrit Presentado por Miguel Sauceda
//variables globales para operandos, operadores, Resultado e interfaces
var tmp
var ExistePunto
var Operador
var Resultado
var Estado
var TipoLeido
var Leido
var Operaciones= new Array()
var alto
var ancho
var altotxt
var anchotxt

//inicializa
Operando2= 0
ExistePunto= "no"

//identifica las teclas o botones de la calculadora
var Tecla= document.getElementsByClassName('tecla')

//asigna el evento clic a cada tecla identificada en la variable Tecla[]
for(var i= 0; i < Tecla.length; i++){
  document.getElementById(Tecla[i].id).onclick= OperarTecla;
}

//evento listener par todas
var lister= document.querySelectorAll(".tecla")
for(var i= 0; i < lister.length; i++){
  lister[i].addEventListener("mousedown", Disminuir)
  lister[i].addEventListener("mouseup", Aumentar)
}

//Disminuir tamaño de teclas
function Disminuir(even){
  ancho= document.getElementById(even.currentTarget.id).width
  ancho = ancho - 8
  anchotxt = ancho.toString()+"px"

  alto= document.getElementById(even.currentTarget.id).height
  alto = alto - 8
  altotxt = alto.toString()+"px"

  document.getElementById(even.currentTarget.id).style.width= anchotxt
  document.getElementById(even.currentTarget.id).style.height = altotxt
}

//Volver teclas a tamaño original
function Aumentar(even){
  alto= document.getElementById(even.currentTarget.id).height
  alto= alto + 8
  altotxt= alto.toString()+"px"

  ancho= document.getElementById(even.currentTarget.id).width
  ancho= ancho + 8
  anchotxt= ancho.toString()+"px"

  document.getElementById(even.currentTarget.id).style.width= anchotxt
  document.getElementById(even.currentTarget.id).style.height = altotxt
}
/*
==============================================================================
recibe: Objeto event
retorna: nada
Descripcion: llama a la función que se encarga de reaccionar en funcion del
estado y la tecla presionada
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
recibe: un elemeno del DOM sobre el cual se ha dado clic
retorna: nada
Descripcion: cambia estados y segun este se realizan acciones correspondientes
pero no hace el calculo
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
        TipoLeido= "operador"
        break;
      case "por":
        Operador= "*"
        TipoLeido= "operador"
        break;
      case "menos":
        Operador= "-"
        TipoLeido= "operador"
        break;
      case "mas":
        Operador= "+"
        TipoLeido= "operador"
        break;
      case "sign":
        TipoLeido= "sign"
        break
      case "igual":
        TipoLeido= "igual"
        break;
      case "on":
        TipoLeido= "on"
        Operaciones= []
        Estado= "eEspera"
        document.getElementById("display").innerHTML = "0"
        ExistePunto= "no"
        break;
      case "punto":
        if (ExistePunto== "no"){
          Leido= "."
          ExistePunto= "si"
        }
        else {
          return
        }
        break;
      }
      if (TipoLeido== "operador"){
        document.getElementById("display").innerHTML = ""
      }
  }

  //control de estados
  switch (Estado) {
    case "eEspera": //0
      if (TipoLeido== "digito"){
        Estado= "eOperando1"
        Operaciones[0]= Leido //el primer operando
        document.getElementById("display").innerHTML = Operaciones[0]
      }
      break;

    case "eOperando1": //1
      if (TipoLeido== "digito"){
        if(Leido== "0" && Operaciones[0]== "0"){
          Operaciones[0]= 0
        }
        else{
            tmp= Number(Operaciones[0])
            if (tmp == 0){
              Operaciones[0]= Leido //el primer operando
            }
            else{
                Operaciones[0]+= Leido //el primer operando
            }
        }
        document.getElementById("display").innerHTML = Operaciones[0]
      }
      else if (TipoLeido== "operador"){
        Estado= "eOperador"
        ExistePunto= "no"
        Operaciones[1]= Operador
      }
      else if (TipoLeido== "sign"){
        tmp= Operaciones[0]
        tmp= Number(tmp) * -1
        Operaciones[0]= String(tmp) //el primer operando
        document.getElementById("display").innerHTML = Operaciones[0]
      }
      break;

    case "eOperador": //2
      if (TipoLeido== "digito"){
        Estado= "eOperando2"
        Operaciones[2]= Leido //el segundo operando
        document.getElementById("display").innerHTML = Operaciones[2].substring(0,8)
      }
      else if (TipoLeido== "igual") {
        RealizarCalculo()
      }
      break;

    case "eOperando2": //3
      if (TipoLeido== "digito"){
        Operaciones[2]+= Leido //el segundo operando
        document.getElementById("display").innerHTML = Operaciones[2].substring(0,8)
      }
      else if (TipoLeido== "operador"){
        Estado= "eOperador"
        Operaciones[3]= Operador
        RealizarCalculo()
        //document.getElementById("display").innerHTML = Operaciones[0]
      }
      else if (TipoLeido== "sign") {
        tmp= Operaciones[2]
        tmp= Number(tmp) * -1
        Operaciones[2]= String(tmp) //el primer operando
        document.getElementById("display").innerHTML = Operaciones[2].substring(0,8)
      }
      else  if (TipoLeido== "igual"){
        Estado= "eIgual"
        document.getElementById("display").innerHTML = RealizarCalculo()
      }
      break;

    case "eIgual":  //4
      if (TipoLeido== "operador"){
        Estado= "eOperador"
        Operaciones[1]= Operador
      }
      else if (TipoLeido=="sign") {
        tmp= Operaciones[0]
        tmp= Number(tmp) * -1
        Operaciones[0]= String(tmp) //el primer operando
        document.getElementById("display").innerHTML = RealizarCalculo()
      }
      else if (TipoLeido== "igual"){
        Estado= "eIgual"
        document.getElementById("display").innerHTML = RealizarCalculo()
      }
      break;

    default:

  }
}

/*
==============================================================================
recibe: nada
retorna: el Resultado de la operacio aritmética
Descripcion: realiza la operacio aritmetica y garda los resultdos parciales
en un arreglo
==============================================================================
*/
function RealizarCalculo(){
  switch (Operaciones[1]){
    case "/":
      if (Number(Operaciones[2]) <= 0){
        Resultado= "Error"
      }
      else{
        Resultado= Number(Operaciones[0]) / Number(Operaciones[2])
      }
      break;

    case "*":
      Resultado= Number(Operaciones[0]) * Number(Operaciones[2])
      break;

    case "-":
      Resultado= Number(Operaciones[0]) - Number(Operaciones[2])
      break;

    case "+":
      Resultado= Number(Operaciones[0]) + Number(Operaciones[2])
      break;
    }
    Operaciones[0]= Resultado
    if (Operaciones[3] != undefined){
        Operaciones[1]= Operaciones[3]
    }
    return String(Resultado).substring(0,8)
}
