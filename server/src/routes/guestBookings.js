const { Router } = require('express'); // Import the Router class from the Express framework.
const router = Router(); // Create a new Router instance to define routes.

const { registerGuestBooking, getAllBookingDetails, deleteBookingById, searchBookingByGuestName } = require('../controllers/guestBookings'); // Import the functions from the guestBookings controller.

// Define a POST route for registering a new guest booking.
// When a POST request is made to the '/bookingDetails' endpoint, the registerGuestBooking function from the controller is executed.
router.post('/bookingDetails', registerGuestBooking);

// Define a GET route for retrieving all booking details.
// When a GET request is made to the '/bookingDetails' endpoint, the getAllBookingDetails function from the controller is executed.
router.get('/bookingDetails', getAllBookingDetails);

// Define a DELETE route for deleting a booking by its ID.
// When a DELETE request is made to the '/bookingDetails/:id' endpoint, the deleteBookingById function from the controller is executed.
router.delete('/bookingDetails/:id', deleteBookingById);

// Define a GET route for searching bookings by guest name.
// When a GET request is made to the '/booking/search' endpoint, the searchBookingByGuestName function from the controller is executed.
router.get('/booking/search', searchBookingByGuestName);

module.exports = router; // Export the router so it can be used in other parts of the application.
