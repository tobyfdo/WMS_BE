'use strict'
// const Koa = require ('koa');
// const app = new Koa();

// app.listen (8000, () => {
//     console.log("App is listening on port 8000");    
// })

const express = require ('express');
const routes = require ('./src/api/routes')
const parser = require ('body-parser')
const db = require ('./db/dbStart')
const mongoose = require ('mongoose')
const cors = require ('cors')

const app = express();
const port = 8000; 

app.use(parser.json());
app.use(parser.urlencoded ({ extended: true }));
app.use(cors());
app.use(require('./src/api/routes'));

//mongoose.connect ('mongodb://localhost/frtMgnt');

db.dbConnect();

const handler = app.listen (port, () => {
    console.log("Listening on port : " + port);  
    
})