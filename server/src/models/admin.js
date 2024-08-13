const mongoose = require('mongoose'); // Importing mongoose library for MongoDB interaction.
const { Schema } = mongoose; // Destructuring to get Schema from mongoose.

// Define the Admin schema, outlining the structure of documents within the Admin collection.
const adminSchema = new Schema({
  phoneNumber: String, // Field for storing the admin's phone number.
  fullName: String,    // Field for storing the admin's full name.
  password: String,    // Field for storing the admin's hashed password.
});

// Create a model named 'Admin' using the adminSchema. This will allow interaction with the Admin collection.
const Admin = mongoose.model('Admin', adminSchema);

// Export the Admin model so it can be used in other parts of the application.
module.exports = Admin;
