const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const multer = require("multer");
const {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
} = require("@firebase/storage");
const storage = require("../firebase");
const memoStorage = multer.memoryStorage();
const upload = multer({ memoStorage });
var NodeGeocoder = require("node-geocoder");

const jwtKey = "e-pg";
var options = {
  provider: "google",
  httpAdapter: "https", // Default
  apiKey: "AIzaSyAFMUfQtK0DsFCXasZ526I196kwS0m97oU", // for Mapquest, OpenCage, Google Premier
  formatter: "json", // 'gpx', 'string', ...
};
// const cloudinary = require('cloudinary');

// const {createPg} = require("../Controllers/pgController");
// router.route("/addpg").post(createPg);

// cloudinary.config(
//   {
//     cloud_name:'dc7ojp0dk',
//     api_key:'865469471918636',
//     api_secret:'SAPjyku3BwbVGJ3-k87sGCxsO9g'
//   }
// )

require("../db/conn");
const User = require("../model/userSchema");
const Pg = require("../model/pgSchema");
// const countermodel = require("../model/counterSchema");
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
        let result = await user.save();
        result = result.toObject();
        delete result.password;
        delete result.cpassword;
        delete result.phone;
        jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
          if (err) {
            res.status(400).send({
              message: "Something went wrong. Please try after sometime",
            });
          }
          return res.status(200).json({
            message: "user registered successfully",
            status: 200,
            result: result,
            auth: token,
          });
        });
      }
    } catch (err) {
      console.log(err);
    }
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

    if (userLogin) {
      const isMatchUser = await bcrypt.compare(password, userLogin.password);

      // const token = await userLogin.generateAuthToken();
      if (!isMatchUser) {
        res.status(400).json({ message: "Invalid Credientials" });
      } else {
        jwt.sign({ userLogin }, jwtKey, { expiresIn: "2h" }, (err, token) => {
          if (err) {
            return res.status(400).send({
              message: "Something went wrong. Please try after sometime",
            });
          }
          let result = userLogin;
          result = result.toObject();
          delete result.password;
          delete result.cpassword;
          delete result.phone;
          return res.status(200).json({
            message: "user Signin successfully",
            status: 200,
            user: result,
            auth: token,
          });
        });
      }
    } else {
      res.status(400).json({ message: "Invalid Email" });
    }
  } catch (err) {
    console.log(err);
  }
});

// logout route

router.put("/logout", verifyTokenOnLogout, function (req, res) {
  const authHeader = req.headers["authorization"];
  jwt.sign(authHeader, "", { expiresIn: 1 }, (logout, err) => {
    if (logout) {
      res.status(200).send({ message: "You have been Logged Out" });
    } else {
      res.status(200).send({ message: "Error" });
    }
  });
});

// router.post('/',(req,res,next)=>
// {
//   console.log(req.body);
//   const file = req.files.photo;
//           cloudinary.uploader.upload(file.tempFilePath,(err,result)=>
//           {
//             console.log(result)
//             return res.status(200).json({message:"send successfully"})
//           })

// })
router.post("/addpg", upload.single("file"), async (req, res) => {
  const file = req.file;
  console.log(req?.body?.pgData);
  const {
    name,
    address,
    city,
    district,
    noofrooms,
    roomtype,
    images,
    price,
    description,
  } = req?.body?.pgData;
  console.log(
    name,
    address,
    city,
    district,
    noofrooms,
    roomtype,
    price,
    description
  );
  if (
    !name ||
    !address ||
    !city ||
    !district ||
    !noofrooms ||
    !roomtype ||
    !price ||
    !description
  ) {
    return res.status(422).json({ message: "plz fill all the data " });
  } else {
    try {
      const pgExits = await Pg.findOne({ name: name });

      if (pgExits) {
        return res.status(422).json({ message: "pg already exits" });
      }
      //        else if (password != cpassword) {
      // //         return res.status(422).json({ message: "password are not matching" });
      //       }
      else {
        // const file = req.files.images;
        // cloudinary.uploader.upload(file.tempFilePath,(err,result)=>
        // {
        //   console.log(result)
        // })
        // let seqId;
        // countermodel.findOneAndUpdate({"$inc":{"seq":1}},{new:true},(err,cd)=>
        // {

        //   if(cd == null)
        //   {
        //     const newval = new Pg({seq:1});
        //     newval.save();
        //     seqId=1;
        //   }
        //   else{
        //     seqId = cd.seq;
        //   }
        // })
        // console.log("inside else");
        const availableroom = noofrooms;
        const pg = new Pg({
          // id:seqId,
          name,
          address,
          city,
          district,
          noofrooms,
          roomtype,
          images,
          price,
          availableroom,
          description,
        });
        let newPg = await pg.save();
        console.log(pg);
        return res.status(200).json({
          message: "registered successfully",
          data: newPg,
          status: 200,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
});

router.get("/getpg/:key?", verifyToken, async (req, res) => {
  // const { name, address, city, district, noofrooms, roomtype,images,price,availableroom,description} = req.body;
  //const name = req.body.pgname;
  try {
    if (req?.params?.key) {
      const pgs = await Pg.find({
        $or: [
          { name: { $regex: req.params.key, $options: "i" } },
          { city: { $regex: req.params.key, $options: "i" } },
          { district: { $regex: req.params.key, $options: "i" } },
        ],
      });
      res.status(200).send(pgs);
    } else {
      const pgs = await Pg.find();
      res.status(200).send(pgs);
    }

    //console.log(usersearchpg);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Error occured" });
  }
});

router.get("/getCity/:longitude?/:latitude?", async (req, resp) => {
  // const { name, address, city, district, noofrooms, roomtype,images,price,availableroom,description} = req.body;
  //const name = req.body.pgname;
  try {
    var geocoder = NodeGeocoder(options);
    console.log(req?.query);
    let longitude = req?.query?.longitude;
    let latitude = req?.query?.latitude;
    console.log(longitude);
    console.log(latitude);
    geocoder.reverse({ lat: latitude, lon: longitude }, function (err, res) {
      console.log(err);
      console.log(res);
      resp.status(200).send({ city: res });
    });
    //console.log(usersearchpg);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Error occured" });
  }
});

router.get("/pg/:id", verifyToken, async (req, res) => {
  
  const idx = req.params.id;
  console.log(idx, "idx")
  try {
    const data = await Pg.findOne({ _id: idx });

    if (data) {
      res.status(200).json(data).send({ message: "Send successfully" });
    } else {
      // res.status(201).send([]);
      res.status(422).send({ message: "Send unsuccessful" });
    }
  } catch (err) {
    console.log(err);
    // res.status(422).send({message:"Send unsuccessful"});
  }
});

function verifyToken(req, res, next) {
  let token = req?.headers["authorization"];
  if (token) {
    token = token.split(" ")[0];
    jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        res.status(401).send({ result: "Please provide a valid token" });
      } else {
        next();
      }
    });
  } else {
    res.status(401).send({ result: "Please add the token with header" });
  }
}

function verifyTokenOnLogout(req, res, next) {
  let token = req?.body?.headers?.authorization;
  console.log(token);
  if (token) {
    token = token.split(" ")[0];
    jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        res.status(401).send({ result: "Please provide a valid token" });
      } else {
        next();
      }
    });
  } else {
    res.status(401).send({ result: "Please add the token with header" });
  }
}
module.exports = router;
