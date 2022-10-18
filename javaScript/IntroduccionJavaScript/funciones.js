/**
*@author alejo
*/

function saluda(){
  alert("Hola mundo");
}

function escribeMensaje(){
  //recuperando el valor del elemento por su id, y escribiendo en el por medio del metodo innerHTML
  document.getElementById('mensajeHtml').innerHTML ="Saludo desde archivo javaScript";
}
