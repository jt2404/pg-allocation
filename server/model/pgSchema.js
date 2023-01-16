const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 
const pgSchema = new mongoose.Schema(
    {
        name:
        {
            type: String,
            required:true
        },
        address:
        {
            type: String,
            required:true
        },
        city:
        {
            type: String,
            required:true
        },
        district:
        {
            type: String,
            required:true
        },
        pincode:
        {
            type: Number,
            required:true
        },
        noofrooms:
        {
            type: Number,
            required:true
        },
        roomtype:
        {
            type: String,
            required:true
        },
        images:
        {
            type: Buffer,
            required:true
        },
        price:
        {
            type: Number,
            required:true
        },
        availableroom:
        {
            type: Number,
            minimum: 0,
            required:true
        },
        description: 
        {
            type: String,
            required: true
        }
        
    }
)
const Pg  = mongoose.model('Pg',pgSchema);
module.exports= Pg;