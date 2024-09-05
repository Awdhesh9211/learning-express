const app=require("express")();
const jwt=require('jsonwebtoken');
const bodyParser=require("body-parser");
const cookieParser = require("cookie-parser");

const KEY="my_secret";
const PORT=process.env.PORT || 8000;
// set body parsing middelware and cookie parsing 
app.use(bodyParser.json());
app.use(cookieParser());
// Auth Middelware function 
const auth=(req,res,next)=>{
    console.log(req.cookies);
    
    const token= req.cookies.token;
    
    if(token == null ) return res.status(401).json({message:"Unathorized"});

    jwt.verify(token,KEY,(err,user)=>{
        if(err) return res.status(403).json({message:"Invalid Token"});
        console.log(user);
        req.user=user;
        next();
    });
}

app.post("/login",(req,res)=>{
    const {username}=req.body;
    // to do database stuff
    const token=jwt.sign({username},KEY,{expiresIn:"2h"});
    res.cookie("token",token,{httpOnly:true,maxAge:3600*24*2})
    res.json({token})
})
app.get("/product",auth,(req,res)=>{
    if(req.user) return res.send("You Can access Product");
})

app.listen(PORT,()=>console.log(`Server is Running on : http://localhost:${PORT}`));
