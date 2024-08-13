const { Router } = require('express'); // Import the Router class from the Express framework.
const router = Router(); // Create a new Router instance to define routes.

const { getListingImagesById } = require('../controllers/listing'); // Import the function from the listing controller that handles image retrieval.

// Define a GET route for retrieving images of a specific listing by its ID.
// When a GET request is made to '/listingImage/:id', the getListingImagesById function from the controller is executed.
router.get('/listingImage/:id', getListingImagesById);

module.exports = router; // Export the router so it can be used in other parts of the application.
