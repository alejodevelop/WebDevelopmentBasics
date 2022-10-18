window.onload = configuraSelect;

function configuraSelect(){
  //Este es el elemento seleccionado por default
  document.getElementById("selectFaq").selectedIndex = 0;
  document.getElementById("selectFaq").onchange = cambiaPagina;
}

function cambiaPagina(){
  var elementoSelect = document.getElementById("selectFaq");
  //recolectando el valor de la opcion seleccionada
  var nuevaPagina = elementoSelect.options[elementoSelect.selectedIndex].value;
  if (nuevaPagina != "" ) {
    window.location = nuevaPagina;
  }
}
