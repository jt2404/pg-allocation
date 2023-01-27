const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 
const pgSchema = new mongoose.Schema(
    {
        // id:Number,
        name:
        {
            type: String,
            required:[true,"Please Enter Product Name"],
            trim:true
        },
        address:
        [
            {
            houseno:
            {
                type: Number,
                required:true
            },
            street:
            {
                type: String,
                required:true
            },
            landmark:
            {
                type: String,
                required:true
            },
            pincode:
            {
                type: Number,
                required:true
            },
            }
        ],
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
        images:[],
            // public_id:
            // {
            //     type: String,
            //     required:true
            // },
            // url:
            // {
                // type: String,
                // required:true
            // },
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
        },
        // numofReviews:
        // [ 
        //     {
        //     name: 
        //     {
        //         type:String,
        //         required:true,
        //     },
        //     rating:
        //     {
        //         type: String,
        //     required: true
        //     },
        //     comment:
        //     {
        //         type: String,
        //         required: true
        //     }
        //     }
        // ]

    }
)
const Pg  = mongoose.model('Pg',pgSchema);
module.exports= Pg;