const express=require("express"); //LEARNING MIDDELWARE
const app=express();

const morgan=require("morgan");  // logs
const bodyParser=require("body-parser");//x-www-form-urlencoded parsing 
const cookieParser=require("cookie-parser");//cookie parseing 
const helmet=require("helmet");//securing server by useful  setting of header

const path=require("path");//path resolve 


// Middelware access err,req,res,next 
// in req first process control goes to middelware and then other controller
// 1.Built-in middelware
app.use(express.json());//Parse json bodies
app.use(express.urlencoded({extended:true}));//Parse url encoded Bodies form 
app.use(express.static(path.join(__dirname ,'public')));
// 2.Third Party Middlware 
app.use(morgan("tiny"));//log request
app.use(cookieParser());//Parse cookie
app.use(helmet());//Secure the app setting various hhtp header
app.use(bodyParser())//parse bodie 
// 3.Application level Middelware 
app.use((req,res,next)=>{
    console.log("I am Application level Middelware ");
    next();
})
// 4.Router level Middelware 
const router=express.Router();
router.use((req,res,next)=>{
    console.log("I am Routes  level Middelware ");
    next();
})
router.get("/route",(req,res)=>{
    res.send("I am router")
})
app.use("/api",router);
// 5.Error Handeling Middelware 
app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send('Something Broke!');
    next();
})

app.get("/",(req,res)=>{ res.send("HIIIII");})

app.listen(8000);


