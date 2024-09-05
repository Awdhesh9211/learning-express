const app=require('express')();
const multer=require('multer');
const path=require('path');
const {connect,model,Schema}=require('mongoose');

app.set('view engine','ejs');
app.set('views',__dirname);


// //////////////////////////////////  DATABSE    MONGOOSE 
connect('mongodb://localhost:27017/imageupload'); // connection 
// const Image=model('image',new Schema({url:String,public_id:String}));//instance of collection according to cloudinary
const Image=model('image',new Schema({url:String}));//instance of collection according to multer upload

// ///////////////////////////////////   1. With Cloudinary
// const cloudinary=require('cloudinary').v2;        
// const {CloudinaryStorage}=require('multer-cloudinary-storage');
// cloudinary.config({        configuration of cloud 
//     cloud_name:"",
//     api_key:"",
//     api_secret:""
// })
// const storage=new CloudinaryStorage({   configuration of storage 
//     cloudinary:cloudinary,
//     params:{
//         folder:"uploads",
//         allowedFormates:['jpg','jpeg','png','gif'],
//         transFormation:[{
//             width:500,
//             height:500,
//             crop:'limit'
//         }]
//     }
// });
// const upload=multer({
//     storage:storage,
//     limits:{fileSize:5*1024*1024},
//     fileFilter:(req,file,cb)=>{
//         const ext=path.extname(file.originalname).toLowerCase();
//         if(['jpg','jpeg','png','gif'].includes(ext)){
//             cb(null,true);
//         }else{
//             cb(new Error('Only inage files are allowed!'));
//         }
//     }
// });

// ////////////////////////////////////////////// 2.Without cloudinary
const upload=multer({
    storage:multer.diskStorage({
        destination:function (req,file,cb){
            cb(null,'uploads/');
        },
        filename:function (req,file,cb){
            cb(null,Date.now() + path.extname(file.originalname));
        }
    }),
    limits:{fileSize:5*1024*1024},
    fileFilter:(req,file,cb)=>{
        const ext=path.extname(file.originalname).toLowerCase();
        if(['.jpg','.jpeg','.png','.gif'].includes(ext)){
            cb(null,true);
        }else{
            cb(new Error('Only inage files are allowed!'));
        }
    }
});

app.get('/',(req,res)=>{
    res.render(path.join(__dirname+"/views/index"));
})
app.post('/upload',upload.array('files',10),async(req,res)=>{
    if(req.files){
        // const image = req.files.map(file=>({   // according to Cloudinary
        //     url:file.path,
        //     public_id:file.filename,
        // }))
        const images = req.files.map(file=>({   // according to Multer uploads
            url:path.join(__dirname+"/uploads/"+file.filename)
        }))
        await Image.insertMany(images);
        req.files.forEach(file =>console.log('File info:',file));
        res.send('File uploaded successfully');
    }else{
        res.status(400).send('No File uploaded or file type not supported!');
    }
});

app.listen(8000,()=>console.log(`Server is running on port http://localhost:8000`));