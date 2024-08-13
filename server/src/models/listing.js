const mongoose = require('mongoose'); // Importing Mongoose to interact with MongoDB.
const { Schema } = mongoose; // Destructuring to get the Schema class from Mongoose.

// Define the listing schema, outlining the structure of documents within the listings collection.
const listingSchema = new Schema({
  listingNumber: String, // Field for storing a unique identifier for the listing (e.g., room or apartment number).
  listingPrice: String,  // Field for storing the price of the listing.

  // Field for storing the availability status of the listing (either 'Available' or 'Unavailable').
  listingAvailability: {
    type: String,
    enum: ['Available', 'Unavailable'], // Restricts the value to these two options.
    default: '' // Default value is an empty string if none is provided.
  },

  // Field for storing the category of the listing (either 'Room' or 'Apartment').
  listingCategory: {
    type: String,
    enum: ['Room', 'Apartment'], // Restricts the value to these two options.
    default: '' // Default value is an empty string if none is provided.
  },

  // Field for storing the location of the listing (either 'Nayabazar' or 'Boudha').
  listingLocation: {
    type: String,
    enum: ['Nayabazar', 'Boudha'], // Restricts the value to these two options.
    default: '' // Default value is an empty string if none is provided.
  },

  listingDescription: String, // Field for storing a description of the listing.
  aboutListing: String,       // Field for storing detailed information about the listing.
  listingPax: Number,         // Field for storing the maximum number of guests the listing can accommodate.
  listingAmenities: [String], // Field for storing an array of amenities offered by the listing.
  listingImages: [String],    // Field for storing an array of image URLs for the listing.
  listingBookedDates: [String] // Field for storing an array of dates that have already been booked.
});

// Create a model named 'Listing' using the listingSchema.
// This model represents the 'listings' collection in MongoDB.
const Listing = mongoose.model('Listing', listingSchema);

// Export the Listing model so it can be used in other parts of the application.
module.exports = Listing;
