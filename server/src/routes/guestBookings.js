const { Router } = require('express');
const router = Router(); 

const { registerGuestBooking, getAllBookingDetails, deleteBookingById, searchBookingByGuestName } = require('../controllers/guestBookings');

router.post('/bookingDetails', registerGuestBooking)
router.get('/bookingDetails', getAllBookingDetails)
router.delete('/bookingDetails/:id', deleteBookingById)
router.get('/booking/search', searchBookingByGuestName);

  
module.exports = router