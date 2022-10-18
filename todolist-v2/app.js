//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const _ = require("lodash");
const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//creating the connection with the database
mongoose.connect("mongodb+srv://admin-alejo:test123@cluster0.fbrvu.mongodb.net/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

//creating a schema
const itemsSchema = {
  name: String
};

//creating the model with the schema pre-designed
const Item = mongoose.model("Item", itemsSchema);

//creating items documents with the made model
const welcome = new Item({
  name: "Welcome to your personal to-do list!"
});

const firstIntruction = new Item({
  name: "Hit the + button to add a new item."
});

const secondInstruction = new Item({
  name: "<-- Hit this to delete an item."
});

//creating an array with all the items created
const defaultItems = [welcome, firstIntruction, secondInstruction];

const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

app.get("/", function(req, res) {

  const day = date.getDate();

  Item.find({}, function(err, foundItems) {

    if (foundItems.length === 0) {
      //incorporating the array with its elements inside, into the database.
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Array inserted successfully!");
          res.redirect("/");
        }
      });
    } else {

      if (err) {
        console.log(err);
      } else {
        res.render("list", {
          listTitle: day,
          newListItems: foundItems
        });
      }

    }

  });

});


app.get("/:customListName", function(req, res) {
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({
    name: customListName
  }, function(err, foundList) {
    if (!err) {
      if (!foundList) {
        //create a new list
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        //show an existing list
        res.render("list", {
          listTitle: customListName,
          newListItems: foundList.items
        });
      }
    } else {
      console.log(err);

    }
  });

});

app.get("/about", function(req, res) {
  res.render("about");
});

app.post("/", function(req, res) {

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  if (listName === date.getDate()) {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({
      name: listName
    }, function(err, foundList) {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }



});

app.post("/delete", function(req, res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === date.getDate()) {
    Item.findByIdAndRemove(checkedItemId, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("item deleted successfully!");
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate({
      name: listName
    }, {
      $pull: {
        items: {
          _id: checkedItemId
        }
      }
    }, function(err, foundList) {
      if (!err) {
        res.redirect("/" + listName);
      } else {
        console.log(err);
      }
    });
  }

});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server has started successfully");
});
