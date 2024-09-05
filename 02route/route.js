// ROUTING INEXPRESS
const server=require("express")();
const PORT=process.env.PORT || 8000;

// BASIC 
      //  if we hit endpoint like "http://localhost:port/"   BY thunderclient / postman / axios / fetch etc
      //  By specifying method like GET/POST/PUT/PATCH/DELETE/ALL etc.
      //  then invoke mapped path Function  this function like getReq or other 
      // these function can access http request and response object for further processing to serve the need of client

const getReq=()=>(req,res)=>res.send("This is post method");

// 1ST WAY OF ROUTING
// ========   server/app.method(path,handlerFunction)
server.get("/",getReq)  //GET -> retrive datafrom server
      .post("/",(req,res)=>res.send("This is post method"))//POST-> create new resource 
      .put("/",(req,res)=>res.send("This is put request"))//PUT-> update existing resource
      .patch("/",(req,res)=>res.send("This is patch method"))//PATCH-> partial update of resource 
      .delete("/",(req,res)=>res.send("This is delete method"))//DELETE-> remove resource
      .all("/all",(req,res)=>res.send("all method applied all provided by express"))// apply for all method 

// 2ND WAY OF ROUTING    
const userRouter=express.Router();  //ROUTES for user 
const adminRouter=express.Router(); //ROUTES for admin
                        // =======   routeR.route(path).method(handlerFunction) 
userRouter.route("/user").get((req,res)=>res.send("This is get method"))
                         .post((req,res)=>res.send("This is post method"))     
                        // ======    router.method(path,handlerFunction)
adminRouter.get("/admin",(req,res)=>res.send("This is get method"))
           .post("/admin",(req,res)=>res.send("This is post method"))

// Now use this routes by passing in server.use(route)
server.use("/secondWay",userRouter);//path as http://localhost/secondWay/user
server.use("/secondWay",adminRouter);//path as http://localhost/secondWay/admin

server.listen(PORT,()=>console.log(`Server : http://localhost:${PORT}`));
