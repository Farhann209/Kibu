const Listing = require("../models/listing"); // Import the Listing model

// Add a new listing
const addNewListing = async (req, res) => {
  try {
    // Extract and save image filenames from the request files
    const listingImages = req.files.map(file => file.filename);
    req.body.listingImages = listingImages;

    // Parse listingAmenities if they are provided as a JSON string
    if (req.body.listingAmenities) {
      req.body.listingAmenities = JSON.parse(req.body.listingAmenities);
    }

    // Create a new listing using the request body data
    await Listing.create(req.body);

    // Return a success message
    return res.json({ msg: 'Listing Added!' });
  } catch (err) {
    console.error(err); // Log the error to the server console
    return res.status(401).json({ msg: "Unable to add new listing" }); // Return an error message
  }
};

// Get all listings
const getAllListing = async (req, res) => {
  try {
    // Fetch all listings from the database
    const listingList = await Listing.find();

    // Return the list of all listings
    return res.json(listingList);
  } catch (err) {
    console.error(err); // Log the error to the server console
    return res.status(500).json({ msg: 'Unable to fetch listings', error: err }); // Return an error message
  }
};

// Get listing details by ID
const getListingDetailsById = async (req, res) => {
  try {
    // Find a listing by its ID
    const listing = await Listing.findById(req.params.id);

    // If listing is found, return its details
    if (listing) {
      return res.json(listing);
    } else {
      return res.status(404).json({ msg: "Listing not found" }); // Return an error message if the listing is not found
    }
  } catch (err) {
    console.error(err); // Log the error to the server console
    return res.status(500).json({ msg: "Unable to fetch listing details", error: err }); // Return an error message
  }
};

// Get listing images by ID
const getListingImagesById = async (req, res) => {
  try {
    // Find a listing by its ID
    const listing = await Listing.findById(req.params.id);

    // If listing is found, return its images
    if (listing) {
      return res.json(listing.listingImages);
    } else {
      return res.status(404).json({ msg: "Listing images not found" }); // Return an error message if the listing is not found
    }
  } catch (err) {
    console.error(err); // Log the error to the server console
    return res.status(500).json({ msg: "Unable to fetch listing images", error: err }); // Return an error message
  }
};

// Delete a listing by listingNumber
const deleteListing = async (req, res) => {
  try {
    // Find and delete a listing by its listingNumber
    const listing = await Listing.findOneAndDelete({ listingNumber: req.params.listingNumber });

    // If listing is found and deleted, return the deleted listing
    if (listing) {
      return res.status(200).json(listing);
    } else {
      return res.status(404).json({ msg: "Listing not found" }); // Return an error message if the listing is not found
    }
  } catch (err) {
    console.error(err); // Log the error to the server console
    return res.status(500).json({ msg: 'Unable to delete listing', error: err }); // Return an error message
  }
};

// Example of updating a listing's booked dates in ISO 8601 format
const updateListingBookedDates = async (listing, action) => {
  const selectedRange = selectedDates[listing._id];

  // Ensure both start and end dates are selected
  if (!selectedRange || !selectedRange.start || !selectedRange.end) {
    alert("Select a date range.");
    return;
  }

  const { start, end } = selectedRange;
  let currentDate = new Date(start);
  const endDate = new Date(end);
  const datesToUpdate = [];

  // Loop through the date range and store each date as 'YYYY-MM-DD'
  while (currentDate <= endDate) {
    datesToUpdate.push(currentDate.toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Initialize or update the set of closed dates
  const updatedClosedDates = new Set(closedDates[listing._id] || []);
  if (action === 'close') {
    datesToUpdate.forEach(date => updatedClosedDates.add(date)); // Close the dates
  } else {
    datesToUpdate.forEach(date => updatedClosedDates.delete(date)); // Open the dates
  }
  setClosedDates((prev) => ({
    ...prev,
    [listing._id]: updatedClosedDates,
  }));

  try {
    const updatedDates = Array.from(updatedClosedDates);

    // Update the listing with the new set of closed dates
    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}listing/${listing._id}`, {
      listingBookedDates: updatedDates
    });

    // Refresh the listings to update the calendar view
    fetchListing();
  } catch (error) {
    console.error(`Failed to ${action} dates:`, error); // Log the error to the server console
  }
};

module.exports = { addNewListing, getAllListing, getListingDetailsById, deleteListing, getListingImagesById, updateListingBookedDates }; // Export the controller functions for use in routes
