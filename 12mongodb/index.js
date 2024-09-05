const express=require("express");
const {connect,Schema,model, default: mongoose}=require('mongoose');
const bodyParser=require("body-parser");
const path=require('path');
const app=express();
const PORT=process.env.PORT || 4000;
// Set Up Mysql Connection 
connect('mongodb://localhost:27017/records'); // connection 
const User=model('user',new Schema({
    name:String,
    age:Number,
}));//instance of collection according to multer upload
// Middelware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
// Routes                          CRUD
//                                 READ
app.get('/',async(req,res)=>{
    const result=await User.find();
    res.render('index', {users: result})
})
//                                  CREAT
app.post('/add', async(req,res)=>{
    const {name,age}=req.body;
    await User.create({name,age});
    res.redirect('/');
})
//                                 UPDATE
app.post('/update/:id', async(req,res)=>{
    const {name,age}=req.body;
    const {id} =req.params;
    await User.findByIdAndUpdate({_id:id},{name,age});
    res.redirect('/');

})
//                                   DELETE
app.post('/delete/:id', async(req,res)=>{
    const {id} =req.params;
    await User.findByIdAndDelete({_id:id});
    res.redirect('/');
})
//                  Start the Server
app.listen(PORT,()=>console.log(`Server is Running on http://localhost:${PORT}`));
