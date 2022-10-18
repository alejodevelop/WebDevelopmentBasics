function sumar(){
  /**Envolvemos todo el codigo en un bloque
  *try y catch para procesar la excepcion
  *en caso de que haya ocurrido alguna
  */
  try{
    //pedimos el valor del operando a
    var a = prompt("Valor a:", "");
    //validamos parametro a, !a revisa si la cadena esta vacia o nula(no es un numero)
    if(!a || isNaN(a)){
      throw new Error("valor invalido de a:" + a);
    }
    //pedimos el valor del operando b
    var b = prompt("Valor b:", "");
    //validamos parametro b, !b revisa si la cadena esta vacia o nula(no es un numero)
    if(!b || isNaN(b)){
      throw new Error("valor invalido de b:" + b);
    }


  /**
   * si no hay problema, hacemos la suma, necesitamos
   * convertir a int los parametros, parseInt convierte
   * a entero, si no es entero no va a realizar la sumar
   * sino concatena los valores
   */

   var c parseInt(a) + parseInt(b);
    alert("la suma es: " + c);
  } catch (e){
    alert("El error es:" + e.message);
  }
}
