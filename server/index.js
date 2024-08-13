const express = require('express'); // Import the Express framework for creating the server.
const path = require('path'); // Import the path module for working with file and directory paths.
const dbConnect = require('./src/db/connection'); // Import the function to connect to the MongoDB database.

const adminRoute = require('./src/routes/admin'); // Import the admin-related routes.
const guestBookingsRoute = require('./src/routes/guestBookings'); // Import the guest bookings-related routes.
const listingRoute = require('./src/routes/listing'); // Import the listing-related routes.
const listingImageRoute = require('./src/routes/listingImage'); // Import the listing image-related routes.

const cors = require('cors'); // Import the CORS middleware to allow cross-origin requests.

dbConnect(); // Connect to the MongoDB database.

const app = express(); // Create an instance of an Express application.

app.use(cors()); // Use CORS middleware to enable cross-origin requests.
require('dotenv').config(); // Load environment variables from a `.env` file into `process.env`.

app.use(express.json()); // Use middleware to parse incoming JSON requests.

// Use the imported routes for handling requests.
app.use(adminRoute);
app.use(guestBookingsRoute);
app.use(listingRoute);
app.use(listingImageRoute);

const port = process.env.PORT; // Get the port number from the environment variables.

app.use('/listing-image', express.static(path.join(__dirname, 'uploads/listings'))); 
// Serve static files (like images) from the 'uploads/listings' directory when the '/listing-image' route is accessed.

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`); // Start the server and listen on the specified port.
});
