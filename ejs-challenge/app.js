//i have to install and require express, body-parser, ejs, lodash, mongoose..
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// Load the full build.
const _ = require('lodash');

const app = express();

const mongoose = require('mongoose');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


mongoose.connect('mongodb://localhost:27017/blogDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//create a schema
const composeSchema = new mongoose.Schema({
  title: String,
  text: String
});

//create a model using the schema
const ComposeContent = mongoose.model('ComposeContent', composeSchema);


const startingContent = new ComposeContent({
  title: "home starting content",
  text: homeStartingContent
});
const startingaboutContent = new ComposeContent({
  title: "about starting content",
  text: aboutContent
});
const startingcontactContent = new ComposeContent({
  title: "contact starting content",
  text: homeStartingContent
});

const defaultItems = [homeStartingContent, aboutContent, contactContent];

//permite usar ejs
app.set('view engine', 'ejs');

//permite usar bodyParser
app.use(bodyParser.urlencoded({
  extended: true
}));

//declara una carpeta como ruta estatica en donde se encontraran los recursos
app.use(express.static("public"));


app.get("/", function (req, res) {

  ComposeContent.find({}, function (err, foundElements) {

    res.render('home', {
      homeStartingContent: defaultItems[0],
      posts: foundElements
    });


  });

})

app.get("/about", function (req, res) {

  ComposeContent.find({}, function (err, foundElements) {


    res.render('about', {
      aboutContent: defaultItems[1]
    });


  });

})

app.get("/contact", function (req, res) {

  ComposeContent.find({}, function (err, foundElements) {


    res.render('contact', {
      contactContent: defaultItems[2]
    });


  });

})


app.get("/compose", function (req, res) {
  res.render('compose');
})

app.get("/post/:Singleparam", function (req, res) {

  let urlId = req.params.Singleparam;
  //let storedTitle = _.lowerCase(req.body.titleCompose);

  ComposeContent.findOne({
    _id: urlId
  }, function (err, foundItem) {
    if (!err) {

      res.render('post', {
        titleCompose: foundItem.title,
        textCompose: foundItem.text
      });
    } else {
      console.log(err);
    }
  });


})

app.post('/compose', function (req, res) {

  const compose = new ComposeContent({
    title: req.body.titleCompose,
    text: req.body.textCompose
  });

  compose.save();

  res.redirect("/");

});


app.listen(3000, function () {
  console.log("server started on port 3000");
});
