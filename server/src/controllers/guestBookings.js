const Listing = require("../models/listing");  // Import the Listing model
const bookingDetails = require("../models/guestBooking");  // Import the guestBooking model

// Register a guest booking
const registerGuestBooking = async (req, res) => {
  try {
    // Step 1: Create the booking in the guestBooking model using the request body data
    const booking = await bookingDetails.create(req.body);

    if (booking) {
      // Step 2: Format and collect the booked dates
      const startDate = new Date(req.body.date.start);  // Convert start date to a Date object
      const endDate = new Date(req.body.date.end);  // Convert end date to a Date object
      const bookedDates = [];

      // Populate all dates between start and end
      let currentDate = startDate;
      while (currentDate <= endDate) {
        bookedDates.push(currentDate.toISOString().split('T')[0]);  // Store dates as YYYY-MM-DD
        currentDate.setDate(currentDate.getDate() + 1);  // Move to the next day
      }

      // Step 3: Update the listing with the new booked dates
      await Listing.findOneAndUpdate(
        { listingNumber: req.body.roomID },  // Find the listing by room ID
        { $push: { listingBookedDates: { $each: bookedDates } } }  // Add the booked dates to the listing
      );

      // Step 4: Send a success response with a confirmation message
      res.status(200).json({
        msg: `Dear ${req.body.guestName}, thank you for booking with Kibu. Your booking is confirmed.`,
        booking  // Include the booking details in the response
      });
    } else {
      res.status(400).json({ msg: 'Booking Failed' });  // Respond with a failure message if the booking fails
    }
  } catch (error) {
    console.error(error);  // Log the error details to the server console
    res.status(500).json({ msg: 'Server Error', error });  // Respond with a server error message
  }
};

// Get all booking details
const getAllBookingDetails = async (req, res) => {
  try {
    const bookingList = await bookingDetails.find();  // Fetch all bookings from the database
    res.status(200).json(bookingList);  // Respond with the list of bookings
  } catch (error) {
    res.status(500).json({ msg: 'Unable to fetch bookings', error });  // Respond with an error message if fetching fails
  }
};

// Delete a booking by ID
const deleteBookingById = async (req, res) => {
  try {
    // Find the booking by its ID
    const booking = await bookingDetails.findById(req.params.id);
    
    if (booking) {
      // Extract the room ID and the date range from the booking
      const { roomID, date } = booking;

      // Convert the dates to an array of strings
      const startDate = new Date(date.start);
      const endDate = new Date(date.end);
      const bookedDates = [];
      let currentDate = startDate;
      while (currentDate <= endDate) {
        bookedDates.push(currentDate.toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1);
      }

      // Update the corresponding listing by removing the booked dates
      await Listing.findOneAndUpdate(
        { listingNumber: roomID },
        { $pull: { listingBookedDates: { $in: bookedDates } } }  // Remove the dates from the listing
      );

      // Finally, delete the booking from the database
      await bookingDetails.findByIdAndDelete(req.params.id);

      return res.status(200).json({ msg: 'Booking deleted', booking });  // Respond with a success message
    } else {
      return res.status(404).json({ msg: 'Booking not found' });  // Respond with an error if the booking is not found
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Unable to delete booking', error });  // Respond with a server error message
  }
};

// Search booking details by guest name
const searchBookingByGuestName = async (req, res) => {
  try {
    const { guestName } = req.query;  // Get the guest name from query parameters
    if (!guestName) {
      return res.status(400).json({ msg: "Guest name is required" });  // Respond with an error if the guest name is not provided
    }

    // Find all bookings with the provided guest name using a case-insensitive search
    const bookings = await bookingDetails.find({ guestName: new RegExp(guestName, 'i') });

    if (bookings.length > 0) {
      res.status(200).json(bookings);  // Respond with the list of matching bookings
    } else {
      res.status(404).json({ msg: "No bookings found for this guest name" });  // Respond with an error if no bookings are found
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error", error });  // Respond with a server error message
  }
};

// Export the controller functions for use in routes
module.exports = { registerGuestBooking, getAllBookingDetails, deleteBookingById, searchBookingByGuestName };
