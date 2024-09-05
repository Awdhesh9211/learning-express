// Creating Express Application / SERVER   
// 1ST WAY
const server1=require("express")();  //1st Way 
server1.get("/",(req,res)=>res.send("Hi From Server One"));
const PORT1=process.env.PORT || 3000;
server1.listen(PORT1,()=>console.log("Server is running on port : http://localhost:3000"));

// 2ND WAY
const express=require("express"); // 2nd Way
const server2=express();
const PORT2=process.env.PORT || 8000;
server2.get("/",(req,res)=>res.send("Hi From Server Two"));
server2.listen(PORT2,()=>console.log(`Server2 is running on port : http://localhost:${PORT2}`));

// 3RD WAY - By http
const http=require("http");
const PORT3=process.env.PORT || 4000;
const app=http.createServer((req,res)=>{
    switch(req.url){
        case "/":
            res.end("Hi from Server Three");
            return;
        default:
            res.end("Not Found");
    }
})

app.listen(PORT3,()=>console.log(`Server2 is running on port : http://localhost:${PORT3}`));
