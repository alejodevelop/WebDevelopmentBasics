/*onload is a event who executing a function once the browser loaded the page*/
window.onload = cargarImagenes;
var directions = [
  'images/dice1.png',
  'images/dice2.png',
  'images/dice3.png',
  'images/dice4.png',
  'images/dice5.png',
  'images/dice6.png'
];

function cargarImagenes() {
  var colector = document.getElementById('img1');
  var random1 = Math.floor((Math.random() * directions.length));
  colector.setAttribute('src', directions[random1]);
  colector = document.getElementById('img2');
  random2 = Math.floor((Math.random() * directions.length));
  colector.setAttribute('src', directions[random2]);
  if (random1 > random2) {
    document.querySelector("h1").innerHTML = "🎲 Player one wins!";
  } else if (random2 > random1) {
    document.querySelector("h1").innerHTML = "Player two wins! 🎲";
  } else {
    document.querySelector("h1").innerHTML = "🎲 Draw! 🎲";
  }
}
