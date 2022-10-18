const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(require, response) {
  response.sendFile(__dirname + '/index.html');
});

app.post('/', function(require, response) {

  var num1 = Number(require.body.num1);
  var num2 = Number(require.body.num2);

  var result = num1 + num2;

  response.send('el resultado es ' + result);
});

app.get('/bmicalculator', function(require, response) {
  response.sendFile(__dirname + '/bmiCalculator.html');
});

app.post('/bmicalculator', function(require, response) {
  var weight = parseFloat(require.body.weight);
  var height = parseFloat(require.body.height);

  var result = weight / (height * height);

  response.send('el resultado es ' + result);
});

app.listen(3000, function() {
  console.log('server running on port 3000');
});
