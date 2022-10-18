/*variables globales*/
var secuencia = [];
var botones = [];
var nivel = 1;
var c = 0;
var aleatorio = Math.floor(Math.random() * (8 - 3)) + 3;
var perdedor = false;
var finalizadaSecuencia = false;
var elemento = document.querySelectorAll('.btn');
var tituloPrincipal = document.querySelector("h1");
tituloPrincipal.innerHTML = 'Press A Key to Start';

/*seccion de eventos*/
document.addEventListener("keydown", function evento(event) {
  if (event.key == "a" && tituloPrincipal.innerHTML == 'Press A Key to Start') {
    reiniciar();
    nivel = 1;
    empezar();
  }
});

var eventoBotones = document.querySelectorAll('.btn');

eventoBotones[0].addEventListener('click', function(event) {
  if (perdedor == false) {
    if (finalizadaSecuencia == true) {
      comprobar(event);
      sonidos(event);
    }
  }
});

eventoBotones[1].addEventListener('click', function(event) {
  if (perdedor == false) {
    if (finalizadaSecuencia == true) {
      comprobar(event);
      sonidos(event);
    }
  }
});
eventoBotones[2].addEventListener('click', function(event) {
  if (perdedor == false) {
    if (finalizadaSecuencia == true) {
      comprobar(event);
      sonidos(event);
    }
  }
});
eventoBotones[3].addEventListener('click', function(event) {
  if (perdedor == false) {
    if (finalizadaSecuencia == true) {
      comprobar(event);
      sonidos(event);
    }
  }
});

/*seccion de funciones generales del juego*/

function empezar() {
  tituloPrincipal.innerHTML = "level " + nivel;
  jugar();
}

//jugar() se encarga de dar inicio al juego, dentro de ella se ejecutan todos
//los pasos necesarios para que el juego funcione
function jugar() {

  ArregloBotones();

  if (nivel === 1) {
    generarPatron(aleatorio);
    reproducirSecuencia(900);
  }
  if (nivel === 2) {
    generarPatron(aleatorio);
    reproducirSecuencia(800);
  }
  if (nivel === 3) {
    generarPatron(aleatorio);
    reproducirSecuencia(700);
  }
  if (nivel === 4) {
    generarPatron(aleatorio);
    reproducirSecuencia(600);
  }
  if (nivel === 5) {
    generarPatron(aleatorio);
    reproducirSecuencia(500);
  }
  if (nivel === 6) {
    generarPatron(aleatorio);
    reproducirSecuencia(400);
  }
  if (nivel === 7) {
    generarPatron(aleatorio);
    reproducirSecuencia(300);
  }
  if (nivel === 8) {
    generarPatron(aleatorio);
    reproducirSecuencia(200);
  }
  if (nivel === 9) {
    generarPatron(aleatorio);
    reproducirSecuencia(200);
  }
  if (nivel === 10) {
    generarPatron(aleatorio);
    reproducirSecuencia(200);
    tituloPrincipal.innerHTML = "Congratulations, You Won! ;) ";
  }


}

/*seccion de funciones especificas del juego*/

//genera un patron de botones a oprimir y devuelve un arreglo llamado secuencia
function generarPatron(tamaño) {

  secuencia = [];

  for (var i = 0; i < tamaño; i++) {
    secuencia[i] = Math.floor(Math.random() * 4 + 1);
  }

}


//ArregloBotones() crea un arreglo de los botones a comparar con el arreglo de
//patron generado aleatoriamente y asi saber cuales imprimir
function ArregloBotones() {
  var elemento = document.querySelectorAll('.btn');

  botones = [];

  for (var i = 0; i < elemento.length; i++) {
    botones[i] = parseInt(elemento[i].getAttribute('value'));
  }


}



//reproducirSecuencia() se encarga de hacer que los botones reproduzcan la secuencia
//de botones a pulsar de forma gráfica


function reproducirSecuencia(velocidad) {

  var i = 0;
  var j = 0;

  function recurrente() {

    if (perdedor == false) {

      if (i == (botones.length - 1) && j == (secuencia.length)) {
        finalizadaSecuencia = true;
      }

      if (botones[i] === secuencia[j]) {
        //elemento que contiene el boton, por ende debe ponerse la posicion del boton

        if (i < botones.length) {
          setTimeout(function() {
            elemento[i].classList.add('pressed');
            sonidosMaquina(botones[i]);
          }, (velocidad / 2));

        }

        setTimeout(function() {
          elemento[i].classList.remove('pressed');
          if (j < secuencia.length) {
            j++;
            i = 0;
            recurrente();
          }
        }, velocidad);
      } else {
        if (i < (elemento.length - 1)) {
          i++;
          recurrente();
        }
      }
    }

  }

  if (i === 0 && j === 0) {
    recurrente();
  }

}

//comprobar() se encarga de comparar el boton oprimido por el usuario con la
//secuencia preoviamente mostrada

function comprobar(event) {
  if (event.path[0].getAttribute('value') == secuencia[c]) {
    animacion(event);


    c++;
    if (secuencia.length == c) {
      nivel++;
      reiniciar();
      empezar();

    }
  } else {
    var audio = new Audio('sounds/wrong.mp3');
    audio.play();
    perdedor = true;
    perdiste();
    setTimeout(function() {
      nivel = 1;
      reiniciar();
      empezar();
    }, 2000);
  }
}

//reiniciar
function reiniciar() {
  c = 0;
  aleatorio = Math.floor(Math.random() * (8 - 3)) + 3;
  finalizadaSecuencia = false;
  perdedor = false;
  secuencia = [];
  botones = [];
}

//animacion de pulsaciones
function animacion(event) {
  setTimeout(function() {
    elemento[(event.path[0].getAttribute('value') - 1)].classList.add('userClick');
  }, );

  setTimeout(function() {
    elemento[(event.path[0].getAttribute('value') - 1)].classList.remove('userClick');
  }, 50);

}

//animacion game-over
function perdiste() {

  setTimeout(function() {
    for (var i = 0; i < elemento.length; i++) {
      elemento[i].classList.add('game-over');
      tituloPrincipal.innerHTML = 'game over';
    }
  }, );

  setTimeout(function() {
    for (var i = 0; i < elemento.length; i++) {
      elemento[i].classList.remove('game-over');
    }
    return true;
  }, 2000);


}


//touch audio
function sonidos(event) {
  if (event.path[0].getAttribute('value') == '1') {
    var audio = new Audio('sounds/green.mp3');
    audio.play();
  }
  if (event.path[0].getAttribute('value') == '2') {
    var audio = new Audio('sounds/red.mp3');
    audio.play();
  }
  if (event.path[0].getAttribute('value') == '3') {
    var audio = new Audio('sounds/yellow.mp3');
    audio.play();
  }
  if (event.path[0].getAttribute('value') == '4') {
    var audio = new Audio('sounds/blue.mp3');
    audio.play();
  }

}

//game-touch audio
function sonidosMaquina(botonOprimido) {
  if (botones[0] === botonOprimido) {
    var audio = new Audio('sounds/green.mp3');
    audio.play();
  }
  if (botones[1] === botonOprimido) {
    var audio = new Audio('sounds/red.mp3');
    audio.play();
  }
  if (botones[2] === botonOprimido) {
    var audio = new Audio('sounds/yellow.mp3');
    audio.play();
  }
  if (botones[3] === botonOprimido) {
    var audio = new Audio('sounds/blue.mp3');
    audio.play();
  }

}
