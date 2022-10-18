/**
 * @author alejo
 */
//indica que cuando se cargue la pagina en la que se este implementando este archivo js
//se cargaran las funciones especificadas
 window.onload = iniciaDatos;

function iniciaDatos(){
  document.getElementById('link').onclick = validaSalir;
  document.getElementById('linkSearch').onclick = busqueda;
}

/**
 * Funcion que valida si el usuario quiere salir del sitio o no
 */
function validaSalir(){
  if (confirm("Desea salir del sitio?")) {
    alert("Nos vamos a google");
    return true; //regresamos verdadero para salir
  } else {
    alert("Nos quedamos en el sitio");
  }
}
/**
 * Funcion que pide una cadena a buscar en google
 */

 function busqueda(){
   //Con la funcion prompt capturamos informacion del usuario
   var respuesta = prompt("Escribe la cadena a buscar:", "");
   //si hubo una respuesta concatenamos la cadena a buscar
   //al link de google
   if (respuesta) {
     alert("Tu respuesta fue:" + respuesta);
     //el operador this nos sirve para referenciar el
     //elemento que provoco el evento, en este caso
     //el elemento con identificador "linkSearch"
     //y concatenamos la respuesta como un parametro
     //de una peticion get
     /**
      * en search?q= el ?q nos permite definir el query
      * (consulta a realizar) que se concatera con
      * la variable respuesta que contiene los datos de la
      * busqueda
      */
     var nuevoLink = this + "search?q=" + respuesta;
     alert("Nuevo link:" + nuevoLink);
     //redireccionamos el link
     window.location = nuevoLink;
     //regresamos false, si no nos lleva al link originalmente
     //registrado en el elemento
     return false;
   } else {
     alert("No proporcionaste ninguna cadena a buscar");
     return false;
   }
 }
