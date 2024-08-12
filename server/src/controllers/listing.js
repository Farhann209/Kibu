const Listing = require("../models/listing");

// Add a new listing
const addNewListing = async (req, res) => {
  try {
    const listingImages = req.files.map(file => file.filename);
    req.body.listingImages = listingImages;
    if (req.body.listingAmenities) {
      req.body.listingAmenities = JSON.parse(req.body.listingAmenities);
    }
    await Listing.create(req.body);
    return res.json({ msg: 'Listing Added!' });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ msg: "Unable to add new listing" });
  }
};

// Get all listings
const getAllListing = async (req, res) => {
  try {
    const listingList = await Listing.find();
    return res.json(listingList);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Unable to fetch listings', error: err });
  }
};

// Get listing details by ID
const getListingDetailsById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (listing) {
      return res.json(listing);
    } else {
      return res.status(404).json({ msg: "Listing not found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Unable to fetch listing details", error: err });
  }
};

// Get listing images by ID
const getListingImagesById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (listing) {
      return res.json(listing.listingImages);
    } else {
      return res.status(404).json({ msg: "Listing images not found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Unable to fetch listing images", error: err });
  }
};

// Delete a listing by listingNumber
const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findOneAndDelete({ listingNumber: req.params.listingNumber });
    if (listing) {
      return res.status(200).json(listing);
    } else {
      return res.status(404).json({ msg: "Listing not found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Unable to delete listing', error: err });
  }
};

// Example of storing a date in ISO 8601 format
const updateListingBookedDates = async (listing, action) => {
  const selectedRange = selectedDates[listing._id];
  if (!selectedRange || !selectedRange.start || !selectedRange.end) {
    alert("Select a date range.");
    return;
  }

  const { start, end } = selectedRange;
  let currentDate = new Date(start);
  const endDate = new Date(end);
  const datesToUpdate = [];

  while (currentDate <= endDate) {
    datesToUpdate.push(currentDate.toISOString().split('T')[0]); // Store in 'YYYY-MM-DD' format
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const updatedClosedDates = new Set(closedDates[listing._id] || []);
  if (action === 'close') {
    datesToUpdate.forEach(date => updatedClosedDates.add(date));
  } else {
    datesToUpdate.forEach(date => updatedClosedDates.delete(date));
  }
  setClosedDates((prev) => ({
    ...prev,
    [listing._id]: updatedClosedDates,
  }));

  try {
    const updatedDates = Array.from(updatedClosedDates);

    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}listing/${listing._id}`, {
      listingBookedDates: updatedDates
    });
    fetchListing(); // Refresh listings to update calendars
  } catch (error) {
    console.error(`Failed to ${action} dates:`, error);
  }
};


module.exports = { addNewListing, getAllListing, getListingDetailsById, deleteListing, getListingImagesById, updateListingBookedDates };
