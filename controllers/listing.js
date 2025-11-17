const Listing = require("../models/listing");
const User = require("../models/user"); // <-- Add this
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;

let geocodingClient;
if (mapToken) {
  geocodingClient = mbxGeocoding({ accessToken: mapToken });
}

// INDEX route
module.exports.index = async (req, res) => {
  let { category } = req.query;
  const allListings = category
    ? await Listing.find({ category })
    : await Listing.find({});
  res.render("listings/index", { allListings, category });
};

// SHOW route
module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner"); // owner must refer to User model
  if (!listing) {
    req.flash("error", "Listing you requested does not exist!");
    return res.redirect("/listings");
  }
  console.log("Listing object:", listing);
  console.log("Listing geometry:", listing.geometry);
  res.render("listings/show.ejs", { listing, mapToken: process.env.MAP_TOKEN });
};

// NEW form route
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// CREATE listing route
module.exports.createListing = async (req, res, next) => {
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;

  if (req.file) {
    newListing.image = { url: req.file.path, filename: req.file.filename };
  }

  if (geocodingClient) {
    let response = await geocodingClient
      .forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      })
      .send();
    if (
      response &&
      response.body &&
      response.body.features &&
      response.body.features.length > 0
    ) {
      newListing.geometry = response.body.features[0].geometry;
    }
  }

  const savedListing = await newListing.save();
  console.log(savedListing);
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

// EDIT form route
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested does not exist!");
    return res.redirect("/listings");
  }
  let originalImageUrl = listing.image[0].url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250,c_fill");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

// UPDATE listing route
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let updateData = req.body.listing;

  if (req.file) {
    updateData.image = { url: req.file.path, filename: req.file.filename };
  }

  if (updateData.location && geocodingClient) {
    const response = await geocodingClient
      .forwardGeocode({
        query: updateData.location,
        limit: 1,
      })
      .send();
    if (response && response.body.features[0]) {
      updateData.geometry = response.body.features[0].geometry;
    } else {
      req.flash("error", "Location not found!");
      return res.redirect(`/listings/${id}/edit`);
    }
  }

  await Listing.findByIdAndUpdate(id, updateData);
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

// DELETE listing route
module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
