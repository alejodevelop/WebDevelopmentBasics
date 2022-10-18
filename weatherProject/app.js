const express = require("express");
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');

});

app.post('/', function(req, res) {

  const query = req.body.cityName;
  const appid = '99f16ae52299a9ba4c4c39c3211ea859';
  const unit = 'metric';
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + appid + '&units=' + unit;
  https.get(url, function(response) {
    console.log(response);

    response.on('data', function(data) {
      //json es una forma de transmitir informacion tal como xml
      //la funcion parse de json permite convertir otro tipo de dato como en este
      //caso, codigo hexadecimal, en formato json
      //
      // console.log(JSON.parse(data));
      // console.log(data);
      //
      // const object = {
      //   name: 'Alejo',
      //   favouriteFood: 'pizza'
      // }


      //stringify simplifica el objeto JSON

      // console.log(JSON.stringify(object));

      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const iconWeather = weatherData.weather[0].icon;
      const imageURL = 'http://openweathermap.org/img/wn/' + iconWeather + '@2x.png';
      //i cannot send twice into one get method because send is the last thing that
      // you send, but you can use write execute code before the send
      res.write('<p>the weather is currently <p>' + weatherDescription);
      res.write('<h1>the temperature in ' + query + ' is ' + temp + ' degrees celcius<h1>');
      res.write('<img src= ' + imageURL + ' >');
      res.send();
    });


  });
});





app.listen(3000, function() {
  console.log('server running on port 3000');
});
