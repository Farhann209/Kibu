const mongoose = require("mongoose"); // Importing the Mongoose library to interact with MongoDB.
const { Schema } = mongoose; // Destructuring to get the Schema class from Mongoose.

// Define the booking schema, outlining the structure of documents within the bookings collection.
const bookingSchema = new Schema({
    roomID: String,      // Field for storing the ID of the room being booked.
    date: Object,        // Field for storing the booking date range (start and end dates).
    price: String,       // Field for storing the total price of the booking.
    guestName: String,   // Field for storing the name of the guest who made the booking.
    pax: Number,         // Field for storing the number of people for the booking (pax).
    email: String,       // Field for storing the guest's email address.
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt timestamps to each booking document.
  }
);

// Create a model named 'bookingDetails' using the bookingSchema.
// This model represents the 'bookingDetails' collection in MongoDB.
const bookingDetails = mongoose.model('bookingDetails', bookingSchema);

// Export the bookingDetails model so it can be used in other parts of the application.
module.exports = bookingDetails;
