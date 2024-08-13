const Admin = require("../models/admin");  // Import the Admin model
const bcrypt = require('bcrypt');  // Import bcrypt for password hashing
const jwt = require('jsonwebtoken');  // Import jsonwebtoken for creating tokens
const saltRounds = 10;  // Define the number of salt rounds for bcrypt

// Function to register a new admin
const registerAdmin = async (req, res) => {
  try {
    // Hash the password from the request body
    const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashPassword;  // Replace the plain password with the hashed version
    
    // Check if the phone number is already registered
    const phoneExist = await Admin.exists({ phoneNumber: req.body.phoneNumber });
    if (phoneExist) {
      // If the phone number is already taken, send a 409 (Conflict) status
      return res.status(409).json({ msg: "Phone Number is taken!" });
    }
    
    // Create the new admin with the hashed password
    await Admin.create(req.body);
    // Send a success response
    return res.json({ msg: "Admin registered" });
  } catch (err) {
    // Log any errors to the console and send a 500 (Internal Server Error) response
    console.error(err);
    res.status(500).json({ msg: "Something went wrong!" });
  }
};

// Function to log in an admin
const loginAdmin = async (req, res) => {
  try {
    // Find the admin by their phone number
    const admin = await Admin.findOne({ phoneNumber: req.body.phoneNumber });
    if (!admin) {
      // If the admin is not found, send a 401 (Unauthorized) status
      return res.status(401).json({ msg: "Phone Number is not registered." });
    }
    
    // Compare the entered password with the stored hashed password
    const IsMatched = await bcrypt.compare(req.body.password, admin.password);
    if (IsMatched) {
      // If the passwords match, generate a JWT token
      const token = jwt.sign({ phoneNumber: admin.phoneNumber }, process.env.SECRET_KEY);
      // Send the token and admin details in the response
      res.json({ msg: "Authorized", token, admin });
    } else {
      // If the passwords do not match, send a 401 (Unauthorized) status
      res.status(401).json({ msg: "Invalid password" });
    }

  } catch (err) {
    // Log any errors to the console and send a 500 (Internal Server Error) response
    console.error(err);
    res.status(500).json({ msg: "Something went wrong!" });
  }
};

module.exports = { registerAdmin, loginAdmin };  // Export the registerAdmin and loginAdmin functions
