const mongoose = require("mongoose")
const { Schema } = mongoose;

const bookingSchema = new Schema({
    roomID: String,
    date: Object,
    price: String,
    guestName: String,
    pax: Number,
    email: String,
  },
  {
    timestamps: true
  }
)
 
const bookingDetails = mongoose.model('bookingDetails', bookingSchema)
module.exports = bookingDetails


