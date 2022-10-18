var imagenes = ["arquitectura.html", "calculadora.html", "lista.html", "reproductores.html", "videos.html"];
var pagina = document.getElementById("paginas");

function cambiarPagina(caja) {
  var numeroPagina = parseInt(caja.getAttribute('value'));
  pagina.setAttribute("src", imagenes[numeroPagina]);
}
