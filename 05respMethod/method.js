// Response Methods
const express=require("express");
const server=express();

const path=require('path');

server.use((req,res,next)=>{
    res.locals.user={name:"Awdhesh"};
    next();//function that passes the process control to next middelware 
})// Locals variable setup by the middelware 

server.get("/send",(req,res)=>{res.send("Hi From Server")})// 1.send(body)     body>> string,object,array or buffer
server.get("/json",(req,res)=>{res.json({sucess:true})})// 2.json(body)     body>> json object 
server.get("/status",(req,res)=>{res.status(200).json({success:true})})// 3.res.status(code) sets the http status code for the response
server.get("/redirect",(req,res)=>{ res.redirect(307,'/render')})// 4.redirect(status,path)

//  5.render(view ,locals ,callback)
     //   view - file 
     //   locals - scope of variable that can be access by view 
     //   callback are Fn
 // 1.create views folder and set up view ingine and npm i ejs 
 // 2.use render method 
 // 3.access locals in view by <%= %> for variable and <% %> for logic 
server.set('view engine', 'ejs');
server.get("/render",(req,res)=>{
    const user=res.locals.user;
    res.render('index',{message:"You are using view Template",name:user.name});
})

server.get('/download',(req,res)=>{res.sendFile(path.join(__dirname,"a.txt"));}) // 6.sendFile(path)
server.get("/cookie",(rq,rs)=>rs.cookie('username',"awdhesh",{httpOnly:true}).send("cookie set"))// 7.cookie(name,value,option) //set cookie 
server.get("/cookie-clear",(rq,rs)=>rs.clearCookie('username').send("cookie cleared"))// 8.clearCookie(name,option)  //clear cookie 

server.listen(8000);


 