const express = require('express');

const app = express();

app.get('/', function(request, response) {
  console.log(request);
  response.send('<h1>hello buddy<h1>');
});

app.get('/contac', function(request, response) {
  response.send('contac me');
});

app.get('/about', function(request, response) {
  response.send('hi, i`m Alejandro');
});

app.get('/hobbies', function(request, response) {
  response.send('i like to play guitar and play videogames such i love programming');
});


app.listen(3000, function() {
  console.log('server started on port 3000');
});
