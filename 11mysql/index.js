const express=require("express");
const mysql=require("mysql2");
const bodyParser=require("body-parser");
const path=require('path');



const app=express();
const PORT=process.env.PORT || 4000;

// Set Up Mysql Connection 
const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'admin123',
    database:'mydb'
})
connection.connect(err=>{
    if(err) throw err;
    console.log("Connected To MySql Databases!!!");
})

// Middelware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

// Routes                          CRUD
//                                 READ
app.get('/',(req,res)=>{
    connection.query('SELECT * FROM users',(err,result)=>{
        if(err) throw err;
        // res.render(path.join(__dirname,'views'), {users: result})
        res.render('index', {users: result})
    })
})
//                                  CREAT
app.post('/add', (req,res)=>{
    const {name,age}=req.body;
    connection.query('INSERT INTO users (name,age) VALUES (?,?)',[name,age],(err)=>{
        if(err) throw err;
        res.redirect('/');
    })
})
//                                 UPDATE
app.post('/update/:id', (req,res)=>{
    const {name,age}=req.body;
    const {id} =req.params;
    connection.query('UPDATE users SET name = ?, age = ? WHERE id = ?',[name,age,id],(err)=>{
        if(err) throw err;
        res.redirect('/');
    })
})
//                                   DELETE
app.post('/delete/:id', (req,res)=>{
    const {id} =req.params;
    connection.query('DELETE FROM users WHERE id = ?',[id],(err)=>{
        if(err) throw err;
        res.redirect('/');
    })
})
//                  Start the Server
app.listen(PORT,()=>console.log(`Server is Running on http://localhost:${PORT}`));
