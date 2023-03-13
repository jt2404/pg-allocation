const mongoose = require("mongoose");
// var SchemaTypes = mongoose.Schema.Types;
const ratingSchema = new mongoose.Schema({
  pg: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pg',
    required: true,
  },
  totalRating:{
    type: Number,
    required: true,
    default: 0,
  },
  totalRatingStar:{
    type: Number,
    required: false,
    float: true,
    default: 0.0,
  },
  ratingStar: {
    type: Number,
    float: true,
    default:0.0,
    min:0.0,
    max:5.0
  }
});
const Rate = mongoose.model("Rate", ratingSchema);
module.exports = Rate;
