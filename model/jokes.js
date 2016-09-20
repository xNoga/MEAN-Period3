var assert = require('assert');
var mongodb = require('mongodb');

module.exports = {
    testJoke : test,
    allJokes : allJokes,
    randomJoke : randomJoke,
    addJoke : addJoke,
    deleteJoke : deleteJoke,
    findJoke : findJoke
}

function test(db, callback) {
    db.collection('jokes').findOne({}, function (err, doc) {
        if(err) callback(err)
        else callback(null, doc)
    })
}

function findJoke(db, id, callback) {
    db.collection('jokes').findOne({
        _id : new mongodb.ObjectID(id)
    }, function (err, result) {
        console.log(result)
        callback(result)
    })
}

function allJokes(db, callback) {
    db.collection('jokes').find({}).toArray(function (err, doc) {
        if(err) callback(err)
        else callback(null, doc)
    })
}

function randomJoke(db, callback) {
    var num = 0
    var result
    allJokes(db, function (err, data) {
        console.log(data[Math.floor( Math.random()*data.length ) + 0])
        callback(null, data[Math.floor( Math.random()*data.length ) + 0])
    })
}

function addJoke(db, joke, callback) {
    db.collection('jokes').insertOne({joke}, function (err, result) {
        if(err) callback(err)

        var finalResult = {status : "Succes inserting a joke in the database"}
        callback(null, finalResult)
    })
}

function editJoke(db, joke, callback) {

}

function deleteJoke(db, id, callback) {
    console.log(id)
    db.collection('jokes').deleteOne({
       _id : new mongodb.ObjectID(id)
    }, function (err, results) {
        var result = {status : "Succes - the joke was deleted"}
        callback(results)
    })
    
}

