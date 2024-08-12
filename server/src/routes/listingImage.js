const { Router } = require('express');
const router = Router();

const {getListingImagesById } = require('../controllers/listing');

router.get('/listingImage/:id', getListingImagesById);


module.exports = router;
