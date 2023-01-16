const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 
const userSchema = new mongoose.Schema(
    {
        name:
        {
            type: String,
            required:true
        },
        email:
        {
            type: String,
            required:true,
            unique: true
        },
        password:
        {
            type: String,
            required:true
        },
        cpassword:
        {
            type: String,
            required:true
        },
        phone:
        {
            type: String,
            required:true,
            unique: true
        },
        stype:
        {
            type: String,
            required:true
        }
    }
)
userSchema.pre('save',async function(next)
{
    console.log('hii from inside')
    if(this.isModified('password'))
    {
        this.password = await bcrypt.hash(this.password,8)
        this.cpassword = await bcrypt.hash(this.cpassword,8)
    }
    next();
} );

const User  = mongoose.model('User',userSchema);
module.exports= User;