const nodemailer=require("nodemailer");
const pass=process.env.pass;
const email=process.env.email;
var transporter = nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:email,
        pass:pass
    }
});

transporter.verify((err)=>{
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log("Server is ready");
    }
});
module.exports=transporter;