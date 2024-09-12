var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("messageHost");
    var myobj = { name: "Company Inc", address: "Highway 37" };
    dbo.collection("messageHost").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});
