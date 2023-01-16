const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express=require("express");
// const cors=require("cors");
const app=express();

dotenv.config({path: './config.env'})


const PORT = process.env.PORT;
require('./db/conn');

app.use(express.json());
app.use(require('./router/auth'));

//const Creator=require("./db/model/Creator");
//const dotenv=require("dotenv");
//dotenv.config({path: './confg.env'});
//require("./db/config")
//app.use(express.json())
//app.use(cors());
//app.use(require('./router/auth'));
const cors = require('cors');
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