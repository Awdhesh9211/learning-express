// Request Property

// req.method   ==return==> methods{POST,GET etc}
// req.url      ==return==> path/query
// req.headers  ==return==> Object containig the headers of the req
// req.body     ==return==> contains the body of the request
// req.query    ==return==> object containig the query str
// req.cookies  ==return==> contain cookies sent by the client
// req.ip       ==return==> IP of client 
// req.path     ==return==> path part of url
// req.hostname ==return==> hostname of the request without port 
// req.protocol ==return==> http or https
const express=require("express");
const server=express();

server.use(express.json());//parse json body


server.get("/user:id",(req,res)=>{
    // 
    console.log('Request Body: ',req.body);//{}
    console.log('Request QUERY: ',req.query);//{}
    console.log('Request Method: ',req.method);//GET
    console.log('Request URL: ',req.url);///user3
    console.log('Request HEADERS: ',req.headers); //{headers}
    console.log('Request PARAMS: ',req.params);// {id:'3'}
    console.log('Request cookies: ',req.cookies);//undefined
    console.log('Request ip: ',req.ip);//ip
    console.log('Request path: ',req.path);///user3
    console.log('Request hostname: ',req.hostname);//localhost
    console.log('Request protocol: ',req.protocol);//http
    res.send("Response Properties");
})

server.listen(8000);


