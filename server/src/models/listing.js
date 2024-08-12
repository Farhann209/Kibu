const mongoose = require('mongoose')
const { Schema } = mongoose;

const listingSchema = new Schema({
  listingNumber: String, 
  listingPrice: String,
  listingAvailability: {
    type: String,
    enum : ['Available','Unavailable'],
    default: ''
  },
  listingCategory: {
    type: String,
    enum : ['Room','Apartment'],
    default: ''
  },
  listingLocation: {
    type: String,
    enum : ['Nayabazar','Boudha'],
    default: ''
  },
  listingDescription: String,
  aboutListing: String,
  listingPax: Number,
  listingAmenities: [String],
  listingImages: [String],
  listingBookedDates: [String]
});
const Listing = mongoose.model('Listing', listingSchema);
module.exports= Listing


