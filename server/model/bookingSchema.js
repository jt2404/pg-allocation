const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
  pg: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pg",
    required: true,
  },
  bookedOn: {
    type: Date,
  },
  effective_from:
  {
    type: Date,
  },
  effective_to:
  {
    type: Date,
  },
  cost:{
    type: Number,
    required: true,
    float: true,
    default: 0.0,
  },
  paymentDone :
  {
    type: Boolean,
    default: false,
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
    },
});
const BookPG = mongoose.model("BookPG", bookingSchema);
module.exports = BookPG;