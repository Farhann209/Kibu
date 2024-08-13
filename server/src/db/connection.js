const mongoose = require('mongoose');  // Import the Mongoose library for MongoDB connection.

// Async function to connect to the MongoDB database.
const dbConnect = async() => {
  try {
    // Attempt to connect to the MongoDB database using the provided URI.
    const connection = await mongoose.connect('mongodb://127.0.0.1:27017/kibu', {
    });

    // If the connection is successful, log a success message to the console.
    if(connection) {
      console.log("Connected to MongoDB");
    }
  } catch(err) {
    // If an error occurs, log the error details to the console.
    console.error("Error connecting to MongoDB:", err);

    // Exit the process with a failure code.
    process.exit(1);
  }
};

// Export the dbConnect function for use in other parts of the application.
module.exports = dbConnect;
