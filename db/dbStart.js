'use strict'

const mongoose = require ('mongoose')

//var db = process.env.DB_URL;
var db = 'mongodb://localhost/frtMgnt';

const dbConnect = () => {
    console.log ("Calling DB connect :" + db);
    return mongoose.connect (db, null, connectionCallBack());

    function connectionCallBack (err) {
        if (err) {
            console.log("Error connecting to mongo DB : " + err);            
        } else {
            console.log ("Connected to mongo db");
        }
    }
}

module.exports.dbConnect = dbConnect;