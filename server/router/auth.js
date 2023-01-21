const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs'); 

// const {createPg} = require("../Controllers/pgController");
// router.route("/addpg").post(createPg);

require("../db/conn");
const User = require("../model/userSchema");
const Pg = require("../model/pgSchema");
router.get("/", (req, res) => {
  res.send(`Hello world from server router js`);
});
// using promises
// router.post('/register',(req,res)=>
// {
//     const {name , email , password, cpassword, phone, stype } =req.body
//     // console.log(req.body);
//     res.json({message: req.body});

//     if(!name || !email || !password|| !cpassword|| !phone || !stype )
//     {
//         return res.status(422).json({error:"plz fill properly"});
//     }

//     User.findOne({email: email})
//     .then((userExits) => {
//             if(userExits)
//             {
//                 return res.status(422).json({error:"plz fill properly"});
//             }
//              const user = new User ({name , email , password, cpassword, phone, stype});

//              user.save().then(() =>
//              {
//                 res.status(201).json({message:"registered successfully"});
//              }).catch((error)=>res.status(500).json({error:"failed to registered"}));

//     }).catch(err => {console.log(err);});
// });

router.post("/register", async (req, res) => {
  const { name, email, password, cpassword, phone, stype } = req.body;

  if (!name || !email || !password || !cpassword || !phone || !stype) {
    return res.status(422).json({ message: "plz fill all the data " });
  } else {
    try {
      const userExits = await User.findOne({ email: email });

      if (userExits) {
        return res.status(422).json({ message: "email already exits" });
      } else if (password != cpassword) {
        return res.status(422).json({ message: "password are not matching" });
      } else {
        const user = new User({
          name,
          email,
          password,
          cpassword,
          phone,
          stype,
        });
        await user.save();
        return res.status(200).json({ message: "registered successfully", status:200 });
      }
    } catch (err) {
      console.log(err);
    }

    // if(userRegister)
    // {
    //     res.status(201).json({message:"registered successfully"});
    // }
    // else{
    //     res.status(500).json({message:"Failed to registered"});
    // }
  }
});

// Login route
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "please fill the data properly" });
    }
    const userLogin = await User.findOne({ email: email });
    console.log(userLogin);


    if(userLogin)
    {
        const isMatch = await bcrypt.compare(password,userLogin.password);

        // const token = await userLogin.generateAuthToken();
        if (!isMatch) 
        {
            res.status(400).json({ message: "Invalid Credientials"});
        }
        else 
        {
            res.status(200).json({ message: "user Signin successfully", status: 200, username:userLogin.name, useremail:userLogin.email });
        }
    }
    else
    {
        res.status(400).json({ message: "Invalid Email"});
    }
    
    
  } catch (err) {
    console.log(err);
  }
});


router.post("/addpg", async (req, res) => 
{
  const { name, address, city, district, noofrooms, roomtype,images,price,availableroom,description} = req.body;

  if (!name || !address || !city || !district || !noofrooms || !roomtype || !images || !price || !availableroom || !description)
  {
    return res.status(422).json({ message: "plz fill all the data " });
  } 
  else 
  {
    try 
    {
        const pgExits = await Pg.findOne({ name: name });

      if (pgExits) {
        return res.status(422).json({ message: "pg already exits" });
      }
//        else if (password != cpassword) {
// //         return res.status(422).json({ message: "password are not matching" });
//       } 
        else 
        {
          const pg = new Pg({
          name, address, city, district, noofrooms, roomtype,images,price,availableroom,description
        });
        await pg.save();
        return res.status(200).json({ message: "registered successfully", status:200 });
        }
      }
    catch (err) {
      console.log(err);
    }
  }
});


router.post("/getpg", async (req, res) => {
  // const { name, address, city, district, noofrooms, roomtype,images,price,availableroom,description} = req.body;
 const name = req.body.pgname;
 console.log(name);
  try {
    
    const usersearchpg = await Pg.find({});
    
    console.log(usersearchpg);
    if(usersearchpg)
    {
        res.status(200).send(usersearchpg);
    }
    else
    {
        res.status(400).send({message : "Error Accured"});
    }
}   

catch (err) {
    console.log(err);
  }
});


module.exports = router;



