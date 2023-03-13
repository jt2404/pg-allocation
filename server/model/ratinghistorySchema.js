const mongoose = require("mongoose");
const ratingHistorySchema = new mongoose.Schema({
  pg: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pg",
    required: true,
  },
  rate: {
    type: Number,
    float: true,
    default: 0.0,
    min: 0.0,
    max: 5.0,
  },
  comment: {
    type: String,
    trim: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});
const Ratehistory = mongoose.model("Ratehistory", ratingHistorySchema);
module.exports = Ratehistory;
