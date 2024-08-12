const { Router } = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const listingNumber = req.body.listingNumber; // Get the listing number from the request body
    const dir = `uploads/listings/${listingNumber}/`;

    // Create the directory if it doesn't exist
    fs.mkdirSync(dir, { recursive: true });

    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Consider changing this to a unique filename
  },
});

const upload = multer({ storage: storage });
const router = Router();

const { addNewListing, getAllListing, getListingDetailsById, deleteListing, updateListingBookedDates } = require('../controllers/listing');

router.post('/listing', upload.array('listingImages'), addNewListing);
router.get('/listing', getAllListing);
router.get('/listing/:id', getListingDetailsById);
router.delete('/listing/:listingNumber', deleteListing);
router.put('/listing/:id', updateListingBookedDates);  // Added PUT route for updating listingBookedDates

module.exports = router;
