var mongo = require('mongodb');


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("8Notes");
    dbo.createCollection("pieces", function(err, res) {
        if (err) throw err;
        console.log("Collection created");
        db.close();
    });
});




const insertDatabase = async function(jsonFile) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("8Notes");
        dbo.collection("pieces").insertMany(jsonFile, function(err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            db.close();
        });
    });
}



module.exports = {
    insertDatabase: insertDatabase,
}