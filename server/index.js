const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express=require("express");
const cors = require("cors");
const multer = require("multer");
const {ref,uploadBytes,listAll} = require("@firebase/storage");
const storage = require("./firebase")


const app=express();
app.use(cors());
app.use(express.json());

const memoStorage = multer.memoryStorage();
const upload = multer({ memoStorage });

app.post("/addPicture", upload.single("pic"), async (req, res) => {
    const file = req.file;
    const imageRef = ref(storage, file.originalname);
    const metatype = { contentType: file.mimetype, name: file.originalname };
    await uploadBytes(imageRef, file.buffer, metatype)
      .then((snapshot) => {
        console.log(snapshot);
        res.send("uploaded!");
      })
      .catch((error) => console.log(error.message));
  });

  
app.get("/pictures", async (req, res) => {
    const listRef = ref(storage);
    let productPictures = [];
    await listAll(listRef)
      .then((pics) => {
        productPictures = pics.items.map((item) => {
          const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${item._location.bucket}/o/${item._location.path_}?alt=media`;
          return {
            url: publicUrl,
            name: item._location.path_,
          };
        });
        res.send(productPictures);
      })
      .catch((error) => console.log(error.message));
  });
// const fileUpload = require('express-fileupload');

dotenv.config({path: './config.env'})


const PORT = process.env.PORT;
require('./db/conn');


app.use(require('./router/auth'));



// app.use(fileUpload({
//     useTempFiles:true
// }))
//const Creator=require("./db/model/Creator");
//const dotenv=require("dotenv");
//dotenv.config({path: './confg.env'});
//require("./db/config")
//app.use(express.json())
//app.use(cors());
//app.use(require('./router/auth'));
// const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
 
 
app.get('/register',(req,res)=>{
    res.send(`Hello world from server router js to register`);
});

app.get('/signin',(req,res)=>{
    res.send(`Hello world from server router js to signin`);
});

app.listen(PORT,()=>
{
    console.log(`server is running at port no ${PORT}`);
});