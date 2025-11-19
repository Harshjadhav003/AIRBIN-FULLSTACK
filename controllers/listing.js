const Listing = require("../models/listing");
const User = require("../models/user");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;

let geocodingClient;
if (mapToken) {
  geocodingClient = mbxGeocoding({ accessToken: mapToken });
}

// ===== INDEX =====
module.exports.index = async (req, res) => {
    let { page = 1, category, search } = req.query;

    const options = {
        page: parseInt(page),
        limit: 9,
        sort: { _id: -1 }
    };

    let query = {};

    // CATEGORY FILTER
    if (category && category !== "all") {
        query.category = category.toLowerCase();
    }

    // SEARCH FILTER
    if (search) {
        const searchRegex = new RegExp(search, "i");

        query.$or = [
            { title: searchRegex },
            { description: searchRegex },
            { location: searchRegex },
            { country: searchRegex },
            { category: searchRegex }
        ];
    }

    // PAGINATION + FILTERS + SEARCH
    const result = await Listing.paginate(query, options);

    res.render("listings/index", {
        allListings: result.docs,
        currentPage: result.page,
        totalPages: result.totalPages,
        category: category || "",
        search: search || "",
        success: req.flash("success") || ""
    });
};

// ===== SHOW =====
module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    res.render("listings/show", { listing, mapToken });
};

// ===== NEW FORM =====
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new");
};

// ===== CREATE =====
module.exports.createListing = async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;

    if (req.file) {
        newListing.image = { url: req.file.path, filename: req.file.filename };
    }

    if (geocodingClient && req.body.listing.location) {
        const response = await geocodingClient.forwardGeocode({ query: req.body.listing.location, limit: 1 }).send();
        if (response.body.features.length > 0) {
            newListing.geometry = response.body.features[0].geometry;
        }
    }

    await newListing.save();
    req.flash("success", "Listing Created!");
    res.redirect("/listings");
};

// ===== EDIT FORM =====
module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }
    res.render("listings/edit", { listing });
};

// ===== UPDATE =====
module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body.listing;

    if (req.file) updateData.image = { url: req.file.path, filename: req.file.filename };

    if (geocodingClient && updateData.location) {
        const response = await geocodingClient.forwardGeocode({ query: updateData.location, limit: 1 }).send();
        if (response.body.features.length > 0) updateData.geometry = response.body.features[0].geometry;
    }

    await Listing.findByIdAndUpdate(id, updateData);
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

// ===== DELETE =====
module.exports.destroyListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};
