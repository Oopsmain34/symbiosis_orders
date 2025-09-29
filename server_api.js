//Import modules
var http = require("http");
var express = require('express');
var mysql      = require('mysql2');
var bodyParser = require('body-parser');

//Create app using express
var app = express();

//start mysql connection
var connection = mysql.createConnection({
  host     : '127.0.0.1', //mysql database host name
  user     : 'root', //mysql database user name
  password : 'root', //mysql database password
  database : 'db' //mysql database name
});

connection.connect(function(err) {
  if (err) throw err
    console.log('You are now connected with mysql database...')
})
//end mysql connection
  
//start body-parser configuration
  app.use( bodyParser.json() );       // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
//end body-parser configuration

//create app server
var server = app.listen(3000,  "127.0.0.1", function () {

    var host = server.address().address
    var port = server.address().port
  
    console.log("Example app listening at http://%s:%s", host, port)
  
  });

//rest api to get all products
app.get("/products",(req, res)=>{
    category =[] 
    scategory = []
    products = []
    connection.query('select * from category', (error, results, fields)=> {
    //  console.log(results)
     category=results;

     connection.query('select * from subcategory', (error, results, fields)=> {
      // console.log(results)
      scategory=results;

      connection.query('select * from product', (error, results, fields)=> {
         products=results;
      console.log(category)
      console.log(scategory)
cat=[]
for(let a in category) {
     subcat=[]
  for(let b in scategory)
  {

    if(category[a].ct_id==scategory[b].ct_id)
    {
  
       product=[]
      for(let c in products)
      {
       if(scategory[b].s_id == products[c].s_id)
       { 
          product.push({"name":products[c].p_name,"price":products[c].p_price})

       }
      }
      subcat.push({"subcategory":scategory[b].s_name, "products":product});
    
 // console.log(mylist1)
      }
    }
    cat.push({"category":category[a].ct_name,"subcategories":subcat});
 
  }
  console.log(cat)
  res.end(JSON.stringify(cat));
});
     });

    
     });
  

 
});