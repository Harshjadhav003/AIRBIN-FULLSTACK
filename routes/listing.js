const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner ,validateListing} = require("../middleware.js");
const Listing = require("../models/listing.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

// Root route: Get all listings and create a new listing
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(upload.single('listing[image]'), isLoggedIn, validateListing, wrapAsync(listingController.createListing));


// New route: Display form to create a new listing
 router.get("/new",isLoggedIn,listingController.renderNewForm);


// Show, Update, and Delete routes for a specific listing
router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner, upload.single('listing[image]'),validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));


//Edit route: Display form to edit a listing
router.get("/:id/edit" ,
  isLoggedIn,
    isOwner,
  wrapAsync(listingController.renderEditForm));

module.exports = router ;