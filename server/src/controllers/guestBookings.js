const Listing = require("../models/listing");
const bookingDetails = require("../models/guestBooking");

// Register a guest booking
const registerGuestBooking = async (req, res) => {
  try {
    // Step 1: Create the booking in the guestBooking model
    const booking = await bookingDetails.create(req.body);

    if (booking) {
      // Step 2: Format and collect the booked dates
      const startDate = new Date(req.body.date.start);
      const endDate = new Date(req.body.date.end);
      const bookedDates = [];

      // Populate all dates between start and end
      let currentDate = startDate;
      while (currentDate <= endDate) {
        bookedDates.push(currentDate.toISOString().split('T')[0]); // Store as YYYY-MM-DD
        currentDate.setDate(currentDate.getDate() + 1);
      }

      // Step 3: Update the listing with the new booked dates
      await Listing.findOneAndUpdate(
        { listingNumber: req.body.roomID },
        { $push: { listingBookedDates: { $each: bookedDates } } }
      );

      // Step 4: Send a success response
      res.status(200).json({
        msg: `Dear ${req.body.guestName}, thank you for booking with Kibu. Your booking is confirmed.`,
        booking
      });
    } else {
      res.status(400).json({ msg: 'Booking Failed' });
    }
  } catch (error) {
    console.error(error); // Log the error details to the server console
    res.status(500).json({ msg: 'Server Error', error });
  }
};

// Get all booking details
const getAllBookingDetails = async (req, res) => {
  try {
    const bookingList = await bookingDetails.find();
    res.status(200).json(bookingList);
  } catch (error) {
    res.status(500).json({ msg: 'Unable to fetch bookings', error });
  }
};

// Delete a booking by ID
const deleteBookingById = async (req, res) => {
  try {
    // Find the booking by its ID
    const booking = await bookingDetails.findById(req.params.id);
    
    if (booking) {
      // Extract the room ID and the date range
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
        { $pull: { listingBookedDates: { $in: bookedDates } } }
      );

      // Finally, delete the booking
      await bookingDetails.findByIdAndDelete(req.params.id);

      return res.status(200).json({ msg: 'Booking deleted', booking });
    } else {
      return res.status(404).json({ msg: 'Booking not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Unable to delete booking', error });
  }
};

// Search booking details by guestName
const searchBookingByGuestName = async (req, res) => {
  try {
    const { guestName } = req.query; // Get the guestName from query params
    if (!guestName) {
      return res.status(400).json({ msg: "Guest name is required" });
    }

    // Find all bookings with the provided guestName
    const bookings = await bookingDetails.find({ guestName: new RegExp(guestName, 'i') }); // Case-insensitive search

    if (bookings.length > 0) {
      res.status(200).json(bookings);
    } else {
      res.status(404).json({ msg: "No bookings found for this guest name" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error", error });
  }
};

module.exports = { registerGuestBooking, getAllBookingDetails, deleteBookingById, searchBookingByGuestName};
