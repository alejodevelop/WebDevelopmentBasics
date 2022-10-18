//acces to the Database using moongose
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

//se crea un schema el cual servira como base para crear elementos individuales
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'you have to specify a name in order to add a new fruit']
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

//se crea una collecion con estos elementos que tendra como base el schema previamente creado
const Fruit = mongoose.model("Fruit", fruitSchema);
//se crea un objeto que tendra las mismas caracteristicas especificadas en el schema
const fruit = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Pretty solid as a fruit"
});

const lemon = new Fruit({
  name: "Lemon",
  rating: 10,
  review: "fabulous"
});

// fruit.save();
// lemon.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: "Amy",
  age: 12,
  favoriteFruit: lemon
});

// person.save();

// const kiwi = new Fruit({
//   name: "Kiwi",
//   rating: 10,
//   review: "the best fruit"
// });
// const orange = new Fruit({
//   name: "orange",
//   rating: 10,
//   review: "delicious nectar"
// });
// const banana = new Fruit({
//   name: "banana",
//   rating: 10,
//   review: "really indispensable"
// });
//
// // Fruit.insertMany([kiwi, orange, banana], function(err) {
// //   if (err) {
// //     console.log(err);
// //   } else {
// //     console.log("successfully saved all the fruits to fruitsDB");
// //   }
// // });

// Person.updateOne({
//   name: "john"
// }, {
//   favoriteFruit: lemon
// }, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("successfully update the document");
//   }
// });

// Fruit.deleteOne({
//   name: "Lemon"
// }, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('the element was removed successfully');
//   }
// });

// Person.deleteMany({
//   name: "john",
//   age: 37
// }, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("all the specified data was removed");
//   }
// });

Fruit.find(function(err, fruits) {
  if (err) {
    console.log(err);
  } else {
    fruits.forEach(element => console.log(element.name));

    mongoose.connection.close();
  }
});





//acces to the Database using the mongo native driver
// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
//
// // Connection URL
// const url = 'mongodb://localhost:27017';
//
// // Database Name
// const dbName = 'fruitsDB';
//
// // Create a new MongoClient
// const client = new MongoClient(url, {
//   useUnifiedTopology: true
// });
//
// // Use connect method to connect to the Server
// client.connect(function(err) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
//
//   const db = client.db(dbName);
//
//   findDocuments(db, function() {
//     client.close();
//   });
//
// });
//
// const insertDocuments = function(db, callback) {
//   const collection = db.collection('fruits');
//   collection.insertMany([{
//     name: "apple",
//     score: 8,
//     review: "Great fruit"
//   }, {
//     name: "orange",
//     score: 6,
//     review: "Kinda sour"
//   }, {
//     name: "banana",
//     score: 9,
//     review: "Great stuff!"
//   }], function(err, result) {
//     assert.equal(err, null);
//     assert.equal(3, result.result.n);
//     console.log("Inserted 3 documents into the collection");
//     callback(result);
//   });
// }
//
// const findDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection('fruits');
//   // Find some documents
//   collection.find({}).toArray(function(err, fruits) {
//     assert.equal(err, null);
//     console.log("Found the following records");
//     console.log(fruits)
//     callback(fruits);
//   });
// }
