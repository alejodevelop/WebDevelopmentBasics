/*num1 = valor a operar*/
var num1 = -1;
/*num2 = valor a operar*/
var num2 = -1;
/*resultado = variable que va acumulando los resultados, se resetea con clr*/
var resultado = 0;
/*operaciones = variable que almacena la operacion que se va a realizar*/
operaciones = "";
/*acumNumString = variable que almacena los numeros que la persona presiona antes
de que presione algun otro boton que no sea un numero, al hacerlo, la variable se
reinicia*/
acumNumString = "";
/*historial de operaciones*/
var historial = "";

/*el metodo recibe la informacion del boton presionado por el usuario*/
function recolectarTecla(tecla) {
  var oprimida = tecla.getAttribute('value');

  /*se recolectan los numeros oprimidos y los puntos*/
  if (oprimida >= 0 && oprimida <= 9 || oprimida === ".") {
    if (acumNumString === "" && oprimida === ".") {

    } else {
      acumNumString = acumNumString + oprimida;
      historial += oprimida;
      pantallaCalculadora(historial);
    }


  }

  var validacion = document.getElementById("vista");
  validacion = validacion.getAttribute('value');


  /*se valida que tipo de tecla presiono el usuario, de no haber sido un numero
  para asi indicarle al programa que hacer*/
  if (oprimida === "+" && validacion != "") {
    if (operaciones === "") {
      operaciones = "+";
      almacenarNumeros();
      historial += oprimida;
      pantallaCalculadora(historial);
    }

  }
  if (oprimida === "-" && validacion != "") {
    if (operaciones === "") {
      operaciones = "-";
      almacenarNumeros();
      historial += oprimida;
      pantallaCalculadora(historial);
    }

  }
  if (oprimida === "*" && validacion != "") {
    if (operaciones === "") {
      operaciones = "*";
      almacenarNumeros();
      historial += oprimida;
      pantallaCalculadora(historial);
    }

  }
  if (oprimida === "/" && validacion != "") {
    if (operaciones === "") {
      operaciones = "/";
      almacenarNumeros();
      historial += oprimida;
      pantallaCalculadora(historial);
    }

  }

  if (oprimida === "clr") {
    reiniciar();
    pantallaCalculadora(historial);
    mostrarResultado(resultado);
  }

  if (oprimida === "=" && validacion != "") {

    almacenarNumeros();

    /*se ejecutara el procedimiento solo si todas las variables necesarias ya
    cuentan con valores*/
    if (num1 != -1 && num2 != -1 && operaciones != "") {
      almacenarNumeros();
      procedimiento();
      reiniciar();
      pantallaCalculadora(historial);
    }

  }




}


/*este metodo realiza los procedimientos segun las operaciones indicadas por el usuario*/
function procedimiento() {

  if (operaciones === "+") {

    resultado = num1 + num2;

  }
  if (operaciones === "-") {

    resultado = num1 - num2;

  }
  if (operaciones === "*") {

    resultado = num1 * num2;

  }
  if (operaciones === "/") {

    resultado = num1 / num2;

  }

  mostrarResultado(resultado);

}

/*este metodo reinicia todos los valores, incluido el resultado acumulado*/
function reiniciar() {
  num1 = -1;
  num2 = -1;
  acumNumString = "";
  resultado = 0;
  operaciones = "";
  historial = "";
  pantallaCalculadora(historial);
}

/*este metodo actualiza los datos de la pagina para que el usuario pueda observar
 el resultado en el contenedor*/
function mostrarResultado(resultado) {
  var numObj = new Number(resultado);
  var stringResultado = numObj.valueOf();
  var recipienteResultados = document.getElementById("cajaResultados");
  recipienteResultados.innerHTML = stringResultado;
}

/*este metodo muestra el historial de teclas oprimidas por el usuario
 en la pantalla de la calculadora*/
function pantallaCalculadora(tecla) {
  var pantalla = document.getElementById("vista");
  pantalla.setAttribute('value', tecla);
}

function almacenarNumeros() {
  
  if (acumNumString != "") {
    if (num1 === -1) {
      num1 = parseFloat(acumNumString);
      acumNumString = "";
    } else if (num2 === -1) {
      num2 = parseFloat(acumNumString);
      acumNumString = "";
    }
  }


}
