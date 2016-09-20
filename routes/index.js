var express = require('express');
var router = express.Router();
var jokesDB = require("/Users/kristoffernoga/WebstormProjects/MongoDBDemo/model/jokes.js")


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// REST API METHODS ----------------------------------
router.get('/test', function (req, res, next) {
  var connection = require("../db/db");
  var db = connection.get();
  var result = {}

  jokesDB.testJoke(db, function (err, data) {
    //console.log(data)
    result = {joke : data.joke}
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(result))
  })
})

router.get('/jokes', function (req, res, next) {
  var connection = require("../db/db");
  var db = connection.get();
  var result = []

  jokesDB.allJokes(db, function (err, data) {
    data.forEach(function (joke) {
        result.push({joke: joke.joke})
    })
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(result))
  })
})

router.get('/joke/random', function (req, res, next) {
  var connection = require("../db/db");
  var db = connection.get();
  var result = {}

  jokesDB.randomJoke(db, function (err, data) {
    console.log(data)
    result = {"joke" : data.joke}
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(result))
  })
})

router.post('/joke', function (req, res, next) {
  var connection = require("../db/db");
  var db = connection.get();

  jokesDB.addJoke(db,req.body, function (err, data) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(data))
  })
})

router.put('/joke', function (req, res, next) {
  var connection = require("../db/db");
  var db = connection.get();
})

router.delete('/joke/:id', function (req, res, next) {
  var connection = require("../db/db");
  var db = connection.get();
  var id = req.params.id

  jokesDB.deleteJoke(db, id, function (data) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(data))
  })

})

router.get('/joke/:id', function (req, res, next) {
  var connection = require("../db/db");
  var db = connection.get();
  var id = req.params.id

  jokesDB.findJoke(db, id, function (results) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    console.log(results)
    res.end(JSON.stringify(results))
  })
})



module.exports = router;
