const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

mongoose.connect('mongodb://localhost/wikiDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const articleSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Article = mongoose.model('Article', articleSchema);

////////////////////////////////////// Request targetting all articles //////////////////////////////////////

app.route('/articles')
  .get(function(req, res) {
    Article.find({}, function(err, results) {
      if (!err) {
        res.send(results);
      } else {
        res.send(err);
      }
    })
  })
  .post(function(req, res) {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });

    newArticle.save(function(err) {
      if (!err) {
        res.send("Succesfully added a new article.");
      } else {
        res.send(err);
      }
    });
  })
  .delete(function(req, res) {
    Article.deleteMany({}, function(err) {
      if (!err) {
        res.send("Succesfully deleted all articles");
      } else {
        console.log(err);
      }
    })
  });

////////////////////////////////////// Request targetting a specific articles //////////////////////////////////////

app.route('/articles/:articleTitle')
  .get(function(req, res) {

    Article.findOne({
      title: req.params.articleTitle
    }, function(err, foundArticle) {
      if (err) {
        console.log(err);
      } else {
        if (foundArticle) {
          res.send(foundArticle);
        } else {
          res.send("No articles matching that title was found!");
        }
      }
    });
  })

  .put(function(req, res) {
    Article.update({
      //search
      title: req.params.articleTitle
    }, {
      //what is going to change
      title: req.body.title,
      content: req.body.content
    }, {
      //overwrite or not the actual content in that element
      overwrite: true
    }, function(err) {
      if (err) {
        res.send(err);
      } else {
        res.send("article replaced succesfully!");
      }
    });
  })
  .patch(function(req, res) {
    Article.update({
        //search
        title: req.params.articleTitle
      },
      //what is going to change
      {
        $set: req.body
      },
      function(err) {
        if (err) {
          res.send(err);
        } else {
          res.send("article update succesfully!");
        }
      });
  })
  .delete(function(req, res) {
    Article.deleteOne({
      title: req.params.articleTitle
    }, function(err) {
      if (!err) {
        res.send("article delete satisfactorily!");
      } else {
        res.send(err);
      }
    });
  });



app.listen(3000, function() {
  console.log("app listening on port 3000!");
})
