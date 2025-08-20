
// require used to load the library ( predefine functions)

const path = require('path');
const express = require('express');  // will create routes
const ejs = require('ejs'); // for view purpose
 
const app = express();

console.log(__dirname);

app.set('views',path.join(__dirname,'views'));

app.set('view engine', 'ejs');

app.get('/add',(req, res) => {
     res.render("add");
  });
app.get('/mod',(req, res) => {
     res.render("mods");
  });
app.get('/login',(req, res) => {
    res.render("login");
 });
 app.get('/success',(req, res) => {
    res.render("success");
 });
//server listening
app.listen(9000);