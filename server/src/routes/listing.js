const { Router } = require('express'); // Import the Router class from the Express framework.
const multer = require('multer'); // Import multer for handling file uploads.
const fs = require('fs'); // Import the fs (file system) module for interacting with the file system.
const path = require('path'); // Import the path module for handling file paths.

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const listingNumber = req.body.listingNumber; // Get the listing number from the request body
    const dir = `uploads/listings/${listingNumber}/`; // Define the directory path based on the listing number.

    // Create the directory if it doesn't exist
    fs.mkdirSync(dir, { recursive: true });

    cb(null, dir); // Pass the directory path to multer's callback.
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Save the uploaded file with its original name.
  },
});

const upload = multer({ storage: storage }); // Configure multer to use the defined storage settings.
const router = Router(); // Create a new Router instance to define routes.

const { addNewListing, getAllListing, getListingDetailsById, deleteListing, updateListingBookedDates } = require('../controllers/listing'); // Import the functions from the listing controller.

// Define a POST route for adding a new listing, with image upload handling.
// When a POST request is made to '/listing', the addNewListing function is executed, and images are saved using multer.
router.post('/listing', upload.array('listingImages'), addNewListing);

// Define a GET route for retrieving all listings.
// When a GET request is made to '/listing', the getAllListing function is executed.
router.get('/listing', getAllListing);

// Define a GET route for retrieving details of a specific listing by ID.
// When a GET request is made to '/listing/:id', the getListingDetailsById function is executed.
router.get('/listing/:id', getListingDetailsById);

// Define a DELETE route for deleting a listing by its listing number.
// When a DELETE request is made to '/listing/:listingNumber', the deleteListing function is executed.
router.delete('/listing/:listingNumber', deleteListing);

// Define a PUT route for updating the booked dates of a listing by its ID.
// When a PUT request is made to '/listing/:id', the updateListingBookedDates function is executed.
router.put('/listing/:id', updateListingBookedDates);

module.exports = router; // Export the router so it can be used in other parts of the application.
