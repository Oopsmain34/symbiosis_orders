var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const express = require("express")
const app = express();
var Product = require('./model/product');
 
var url = 'mongodb://127.0.0.1:27017/BTDEMO'

mongoose.connect(url);
(async () => { 
    const result = await Product.find() ;
    console.log(result)
})();

app.listen(7000, () => console.log("Server UP & RUnning *7000"));

