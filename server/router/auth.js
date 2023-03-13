const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const multer = require("multer");
const nodemailer = require("nodemailer");
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
// var options = {
//   provider: "google",
//   httpAdapter: "https", // Default
//   apiKey: "AIzaSyAFMUfQtK0DsFCXasZ526I196kwS0m97oU", // for Mapquest, OpenCage, Google Premier
//   formatter: "json", // 'gpx', 'string', ...
// };
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   host: "smtp.gmail.com",
//   port: 465,
//   ignoreTLS: false,
//   secure: false,
//   auth: {
//     user: "noreply.stayease@gmail.com",
//     pass: "scpwaqzsuidbneue",
//   },
// });
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
const Rate = require("../model/ratingSchema");
const Ratehistory = require("../model/ratinghistorySchema");
const BookPG = require("../model/bookingSchema");
const transporter = require("../middleware/mailing");
const { set } = require("mongoose");
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

router.put("/logout", function (req, res) {
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
  const {
    id,
    name,
    address,
    city,
    district,
    noofrooms,
    roomtype,
    images,
    price,
    description,
    sharingPerRoom,
    userId,
  } = req?.body;
  if (
    !name ||
    !address ||
    !city ||
    !district ||
    !noofrooms ||
    !roomtype ||
    !price ||
    !description ||
    !sharingPerRoom ||
    !userId
  ) {
    return res.status(422).json({ message: "plz fill all the data " });
  } else {
    try {
      if (!id) {
        const pgExits = await Pg.findOne({ name: name });
        if (pgExits) {
          return res.status(422).json({ message: "pg already exits" });
        }
        const availableroom = noofrooms;
        const totalAccomodation = noofrooms * sharingPerRoom;
        const pg = new Pg({
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
          totalAccomodation,
          sharingPerRoom,
          owner: userId,
        });
        let newPg = await pg.save();
        const rate = new Rate({ pg: newPg.id });
        rate.save();
        return res.status(200).json({
          message: "registered successfully",
          data: newPg,
          status: 200,
        });
      } else {
        const availableroom = noofrooms;
        const totalAccomodation = noofrooms * sharingPerRoom;
        // let idQuery = {_id:id}
        const pgExits = await Pg.findOne({ _id: id });
        pgExits.name = name;
        pgExits.address = address;
        pgExits.city = city;
        pgExits.district = district;
        pgExits.noofrooms = noofrooms;
        pgExits.roomtype = roomtype;
        pgExits.price = price;
        pgExits.availableroom = availableroom;
        pgExits.description = description;
        pgExits.totalAccomodation = noofrooms * sharingPerRoom;
        pgExits.sharingPerRoom = sharingPerRoom;
        pgExits.save();
        return res.status(200).json({ message: "PG Updated successfully" });
      }
    } catch (err) {
      console.log(err);
    }
  }
});

router.get("/getpg/:key?", verifyToken, async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "e-pg");
  const userId = decoded.userLogin?._id;
  const role = decoded.userLogin?.stype;
  try {
    let pgs = [];
    if (role === "admin") {
      if (!req?.params?.key) {
        pgs = await Pg.find({ owner: userId });
      } else {
        pgs = await Pg.find({
          owner: userId,
          $or: [
            { name: { $regex: req.params.key, $options: "i" } },
            { city: { $regex: req.params.key, $options: "i" } },
            { district: { $regex: req.params.key, $options: "i" } },
          ],
        });
      }
    } else {
      if (req?.params?.key) {
        pgs = await Pg.find({
          $or: [
            { name: { $regex: req.params.key, $options: "i" } },
            { city: { $regex: req.params.key, $options: "i" } },
            { district: { $regex: req.params.key, $options: "i" } },
          ],
        });
      } else {
        pgs = await Pg.find();
      }
    }
    let allPG = [];
    for (let i = 0; i < pgs.length; i++) {
      const ratingForPg = await Rate.findOne({ pg: pgs[i].id });
      let pg = {
        id: pgs[i].id,
        name: pgs[i].name,
        address: pgs[i].address,
        city: pgs[i].city,
        district: pgs[i].district,
        noofrooms: pgs[i].noofrooms,
        roomtype: pgs[i].roomtype,
        images: pgs[i].images,
        price: pgs[i].price,
        availableroom: pgs[i].availableroom,
        description: pgs[i].description,
        sharingPerRoom: pgs[i].sharingPerRoom,
        totalAccomodation: pgs[i].sharingPerRoom * pgs[i].noofrooms,
        longitude: pgs[i]?.longitude,
        latitude: pgs[i]?.latitude,
        averageRating: ratingForPg?.ratingStar || 0,
      };
      allPG.push(pg);
    }
    res.status(200).send(allPG);

    //console.log(usersearchpg);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Error occured" });
  }
});

// router.get("/getCity/:longitude?/:latitude?", async (req, resp) => {
//   // const { name, address, city, district, noofrooms, roomtype,images,price,availableroom,description} = req.body;
//   //const name = req.body.pgname;
//   try {
//     var geocoder = NodeGeocoder(options);
//     console.log(req?.query);
//     let longitude = req?.query?.longitude;
//     let latitude = req?.query?.latitude;
//     console.log(longitude);
//     console.log(latitude);
//     geocoder.reverse({ lat: latitude, lon: longitude }, function (err, res) {
//       console.log(err);
//       console.log(res);
//       resp.status(200).send({ city: res });
//     });
//     //console.log(usersearchpg);
//   } catch (err) {
//     console.log(err);
//     res.status(400).send({ message: "Error occured" });
//   }
// });

router.get("/getcity", async (req, resp) => {
  // const { name, address, city, district, noofrooms, roomtype,images,price,availableroom,description} = req.body;
  // const name = req.body.city;
  try {
    const pgs = await Pg.find({});
    const cities = [];

    for (let i = 0; i < pgs.length; i++) {
      if (cities.includes(pgs[i].city)) {
        continue;
      }
      cities.push(pgs[i].city);
    }
    resp.status(200).send(cities);
  } catch (err) {
    console.log(err);
    resp.status(400).send({ message: "Error occured" });
  }
});

router.get("/maxPrice", async (req, res) => {
  // const { name, address, city, district, noofrooms, roomtype,images,price,availableroom,description} = req.body;
  // const name = req.body.city;
  try {
    const pgs = await Pg.find({});
    let maxPrice = 0;

    for (let i = 0; i < pgs.length; i++) {
      if (pgs[i].price > maxPrice) {
        maxPrice = pgs[i].price;
      }
    }
    res.status(200).send({ maxPrice: maxPrice });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Error occured" });
  }
});

router.get("/pg/:id", verifyToken, async (req, res) => {
  const idx = req.params.id;
  try {
    const data = (await Pg.findOne({ _id: idx })) || {};
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
});

router.get("/xyz", async (req, res) => {
  const price = parseInt(req?.query?.price);
  const city = req?.query?.city;
  const rating = parseFloat(req?.query?.rating);
  try {
    const pgs = await Pg.find({});
    let finalPG = pgs;
    if (price !== 0) {
      const filteredPgs = finalPG.filter((pg) => pg?.price <= price);
      finalPG = filteredPgs;
    }
    if (city) {
      console.log("I am here 2");
      const filteredPgs = finalPG.filter((pg) => pg?.city === city);
      finalPG = filteredPgs;
    }
    let filteredBasedOnRating = [];
    if (rating) {
      for (let i = 0; i < finalPG?.length; i++) {
        const ratingForGivenPG = await Rate.findOne({ pg: finalPG[i]._id });
        if (ratingForGivenPG) {
          if (ratingForGivenPG?.ratingStar <= rating) {
            filteredBasedOnRating.push(finalPG[i]);
          }
        }
      }
      finalPG = filteredBasedOnRating;
    }
    let allPG = [];
    for (let i = 0; i < finalPG.length; i++) {
      const ratingForPg = await Rate.findOne({ pg: finalPG[i].id });
      let pg = {
        id: finalPG[i].id,
        name: finalPG[i].name,
        address: finalPG[i].address,
        city: finalPG[i].city,
        district: finalPG[i].district,
        noofrooms: finalPG[i].noofrooms,
        roomtype: finalPG[i].roomtype,
        images: finalPG[i].images,
        price: finalPG[i].price,
        availableroom: finalPG[i].availableroom,
        description: finalPG[i].description,
        sharingPerRoom: finalPG[i].sharingPerRoom,
        totalAccomodation: finalPG[i].sharingPerRoom * finalPG[i].noofrooms,
        averageRating: ratingForPg?.ratingStar || 0,
      };
      allPG.push(pg);
    }
    res.status(200).send(allPG);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Error occured" });
  }
});

router.post("/addRating", async (req, res) => {
  const { pgId, rate, comment, userId } = req.body;
  if (!pgId || !rate || !comment || !userId) {
    return res.status(422).json({ message: "plz fill all the data " });
  } else {
    try {
      const pg = await Pg.findOne({ _id: pgId });
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return res.status(422).json({ message: "User not found" });
      }
      if (!pg) {
        return res.status(422).json({ message: "PG not found" });
      }
      const ratehistory = new Ratehistory({
        pg: pg.id,
        rate,
        comment,
        user: user.id,
      });
      let ratingHistory = await ratehistory.save();
      let rateObj = await Rate.findOne({ pg: pg.id });
      let totalRatingCount = rateObj.totalRating + 1;
      let totalRatingStar = rateObj.totalRatingStar + rate;
      let averageRating = totalRatingStar / totalRatingCount;
      rateObj.totalRating = totalRatingCount;
      rateObj.totalRatingStar = totalRatingStar;
      rateObj.ratingStar = averageRating;
      rateObj.save();
      return res.status(200).json({
        ratingHistory: ratingHistory,
        message: "Rating Added successfully",
        averageRating: averageRating,
      });
    } catch (err) {
      console.log(err);
    }
  }
});

router.post("/addBooking", async (req, res) => {
  const { pgId, bookedOn, userId, range, cost } = req.body;
  const customeremail = await User.findOne({ _id: userId });
  if (!pgId || !bookedOn || !userId || range?.length === 0 || !cost) {
    return res.status(422).json({ message: "plz fill all the data " });
  } else {
    try {
      const pg = await Pg.findOne({ _id: pgId });
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return res.status(422).json({ message: "User not found" });
      }
      if (!pg) {
        return res.status(422).json({ message: "PG not found" });
      }
      if (pg.totalAccomodation === 0) {
        return res.status(422).json({ message: "PG is full" });
      }
      const bookPg = new BookPG({
        pg: pg.id,
        bookedOn,
        user: user.id,
        effective_from: range[0],
        effective_to: range[1],
        cost: parseFloat(cost),
      });
      bookPg.save();
      const pgOwner = await User.findOne({ _id: pg.owner })
      let previousTotalAccomodation = pg.totalAccomodation;
      let sharingPerRooms = pg.sharingPerRoom;
      pg.totalAccomodation = previousTotalAccomodation - 1;
      if ((previousTotalAccomodation - 1) % sharingPerRooms === 0) {
        pg.sharingPerRooms = sharingPerRooms - 1;
      }
      pg.save();
      let username = String(user.name)
      let startdate = range[0]
      let enddate = range[1]
      let price = parseInt(cost)
      let mailOptions = {
        from: "noreply.stayease@gmail.com",
        to: String(user.email),
        subject: `Your Booking for PG ${pg.name} is confirmed`,
        html: `<!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <title>Booking Confirmation Summary</title>
                <style>
                  table
                  {
                    width:100%;
                    border-collapse:collapse
                  }
                  th {border: 1px solid #b6c0d1; padding:5px 10px; background-color:#e4e9f0;color:#0B294E}
                  td {border: 1px solid #b6c0d1; padding: 8px; color:"#536789"; text-align: center}
                </style>
            </head>
            <body>
                <p style="font-weight: 600; color: #0B294E;">Hello, ${username}</p>
                <p>Your booking has been confirmed. Thank you for booking with us.</p>
                <p style="color:#536789; margin-top: 0px; font-weight: 800; margin-bottom: 3px;">You will find the details of your booking and payment details below.</p>
                <table>
                    <caption></caption>
                    <tbody>
                        <tr>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Cost</th>
                            <th>Booked on</th>
                            <th>PG Name</th>
                            <th>PG Address</th>
                            <th>City</th>
                        </tr>
                        <tr>
                            <td>${startdate}</td>
                            <td>${enddate}</td>
                            <td>${price}</td>
                            <td>${bookedOn}</td>
                            <td>${pg.name}</td>
                            <td>${pg.address}</td>
                            <td>${pg.city}</td>
                        </tr>
                    </tbody>
                </table>
                <p>
                    <em>This is an automated email. Please don't reply to this email.</em>
                </p>
                <p>Thanks,</p>
                <p>StayEase Platform</p>
            </body>
        </html>`,
      };
      let mailOptions2 = {
        from: "noreply.stayease@gmail.com",
        to: String(pgOwner.email),
        subject: `New Booking Request for PG ${pg.name}`,
        html: `<!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <title>Booking Request From User</title>
                <style>
                  table
                  {
                    width:100%;
                    border-collapse:collapse
                  }
                  th {border: 1px solid #b6c0d1; padding:5px 10px; background-color:#e4e9f0;color:#0B294E}
                  td {border: 1px solid #b6c0d1; padding: 8px; color:"#536789"; text-align: center}
                </style>
            </head>
            <body>
                <p style="font-weight: 600; color: #0B294E;">Hello, ${pgOwner.name}</p>
                <p>You got 1 Booking Request from user.</p>
                <p style="color:#536789; margin-top: 0px; font-weight: 800; margin-bottom: 3px;">Please find the booking details of user below.</p>
                <table>
                    <caption></caption>
                    <tbody>
                        <tr>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Contact</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Cost</th>
                            <th>Booked on</th>
                            <th>PG Name</th>
                        </tr>
                        <tr>
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                            <td>${user.phone}</td>
                            <td>${startdate}</td>
                            <td>${enddate}</td>
                            <td>${price}</td>
                            <td>${bookedOn}</td>
                            <td>${pg.name}</td>
                        </tr>
                    </tbody>
                </table>
                <p>
                    <em>This is an automated email. Please don't reply to this email.</em>
                </p>
                <p>Thanks,</p>
                <p>StayEase Platform</p>
            </body>
        </html>`,
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return console.log(err);
        }
        console.log(`Message Sent ${info.messageId}`);
        transporter.sendMail(mailOptions2, (err, info) => {
        if (err) {
          return console.log(err);
        }
        console.log(`Message Sent ${info.messageId}`);
      });
      });
      return res.status(200).json({ message: "PG booked successfully" });
    } catch (err) {
      console.log(err);
    }
  }
});

router.get("/getratingHistory/:id", async (req, res) => {
  const idx = req.params.id;
  try {
    const data1 = (await Ratehistory.find({ pg: idx })) || [];
    let finalData = [];
    for (let i = 0; i < data1.length; i++) {
      const user = await User.findOne({ _id: data1[i]?.user });
      const userInfo = { name: user?.name, email: user?.email };
      const ratingDetail = {
        id: data1[i]?._id,
        rate: data1[i]?.rate,
        comment: data1[i]?.comment,
        userInfo: userInfo,
      };
      finalData.push(ratingDetail);
    }
    res.status(200).send(finalData);
  } catch (err) {
    console.log(err);
  }
});

router.get("/getrating/:id", async (req, res) => {
  const idx = req.params.id;
  try {
    const data1 = await Rate.findOne({ pg: idx });
    // print(data);
    if (data1) {
      res.status(200).send({
        averageRating: data1.ratingStar,
        totalRateCount: data1.totalRating,
      });
    } else {
      res.status(200).send({});
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/bookings", async (req, res) => {
  // const pgId = req.params.pgId;
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "e-pg");
  const userId = decoded.userLogin?._id;
  try {
    let pgs = await Pg.find({ owner: userId });
    const bookingData = [];
    for (let i = 0; i < pgs.length; i++) {
      const bookings = await BookPG.find({ pg: pgs[i]?._id }).populate("pg");
      const bookingInfoForGivenPG = [];
      for (let j = 0; j < bookings?.length; j++) {
        const userInfo = await User.findOne({ _id: bookings[j]?.user });
        const userDetails = {
          name: userInfo?.name,
          email: userInfo?.email,
          phone: userInfo?.phone,
        };
        const bookingDetailForUser = {
          cost: bookings[j].cost,
          effectiveFrom: bookings[j]?.effective_from,
          effectiveTo: bookings[j]?.effective_to,
          bookedOn: bookings[j]?.bookedOn,
          pgInfo: bookings[j]?.pg?.name,
          userDetail: userDetails,
        };
        bookingInfoForGivenPG.push(bookingDetailForUser);
      }
      bookingData.push(bookingInfoForGivenPG);
    }
    res.status(200).send(bookingData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving bookings" });
  }
});

router.get("/booking/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const bookings = await BookPG.find({ user: userId }).populate("pg");
    res.status(200).send(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving bookings" });
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

function sendMailOnBooking(userEmail) {
  console.log(userEmail);
  const mailOptions = {
    from: "noreply.stayease@gmail.com",
    to: userEmail,
    subject: "Congratulations, Your PG has been booked successfully",
    text: "Hi, Your PG has been booked successfully",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      return res.status(200).json({ message: "Booked PG successfully" });
    }
  });
}
module.exports = router;
