const path= require('path');
const express= require('express');
const hbs=require('hbs');
const bodyparser=require('body-parser');
const mysql=require('mysql2');
const multer=require('multer');
const app=express();

const conn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'crud_db1'
});

conn.connect((err) =>{
    if(err) throw err;
    console.log('mysql connected!');
});

app.set('views',path.join(__dirname,'views'));

app.set('view engine','hbs');

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use('/assets',express.static(__dirname+'/public'));

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


//multer
var imagename='';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);

   imagename=Date.now() + path.extname(file.originalname)+'';
console.log(imagename);
        cb(null, imagename);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpg'|| file.mimetype=='image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });


app.get('/saveform',(req,res)=>{
    res.render("product_form");
});

app.get('/',(req,res)=>{
    let sql="select * from product";
    let query=conn.query(sql,(err,result)=>{
        if(err) throw err;
        res.render('product_view',{
            results:result
        });
    });
});

app.get('/productedit/:id',function(req,res){
    const id=req.params.id;
    console.log(id);
   
    let sql="select * from product where product_id="+id;
    let query=conn.query(sql,(err,result)=>{
        if(err) throw err;
        res.render("product_update",{
            results:result
        });
    });
});

//route for deletion 
app.get('/productdelete/:id',function(req,res){
    const id =req.params.id;
    console.log(id);
    let sql="delete from product where product_id="+id;
       conn.query(sql,(err,result)=>{
        if(err) throw err;
        let sql ="select * from product";
       conn.query(sql,(err,result)=>{
            if(err) throw err;
            res.redirect('/');
        });
    });
});

//route for insert
app.post('/upload', upload.single('product_image'), (req, res, next) => {

    let data={
        product_id:req.body.product_id,
        product_name:req.body.product_name,
        product_price:req.body.product_price,
        product_image:imagename
    };

    let sql ="insert into product set ?";
    let query= conn.query(sql,data,(err,result)=>{
        if(err) throw err;
        let sql="select * from product";
        let query=conn.query(sql,(err,result)=>{
            if(err) throw err;
            res.render('product_view',{
                results:result
            });
        });

    });
});

//route for update
app.post('/updateproduct',upload.single('product_image'),(req,res,next)=>{
   
    let sql ="update product set product_name='"+req.body.product_name+"', product_price='"+req.body.product_price+"', product_image='"+imagename+"'  where product_id="+req.body.product_id;
    let query= conn.query(sql,(err,result)=>{
        if(err) throw err;
       res.redirect('/');
        });
    });




app.listen(8000,()=>{
    console.log('server is running at port 8000'); 
});