const Booking = require("../models/booking.js");
const Listing = require("../models/listing.js");

/**
 * CREATE BOOKING
 * POST /booking/:id
 */
module.exports.createBooking = async (req, res) => {
  const { checkIn, checkOut } = req.body;

  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listing");
  }

  const start = new Date(checkIn);
  const end = new Date(checkOut);

  const days = (end - start) / (1000 * 60 * 60 * 24);

  if (days <= 0) {
    req.flash("error", "Invalid booking dates");
    return res.redirect(`/listing/${listing._id}`);
  }

  const totalPrice = days * listing.price;

  await Booking.create({
    listing: listing._id,
    user: req.user._id,
    checkIn: start,
    checkOut: end,
    totalPrice,
  });

  req.flash("success", "Booking successful!");
  res.redirect("/booking");
};

/**
 * SHOW ALL BOOKINGS
 * GET /booking
 */
module.exports.showBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate("listing");

  res.render("booking/index.ejs", { bookings });
};

/**
 * SHOW SINGLE BOOKING
 * GET /booking/:id
 */
module.exports.showSingleBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate("listing");

  if (!booking) {
    req.flash("error", "Booking not found");
    return res.redirect("/booking");
  }

  if (!booking.user.equals(req.user._id)) {
    req.flash("error", "Not authorized");
    return res.redirect("/booking");
  }

  res.render("booking/show.ejs", { booking });
};

/**
 * DELETE BOOKING
 * DELETE /booking/:id
 */
module.exports.deleteBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking || !booking.user.equals(req.user._id)) {
    req.flash("error", "Not authorized");
    return res.redirect("/booking");
  }

  await Booking.findByIdAndDelete(req.params.id);
  req.flash("success", "Booking cancelled");
  res.redirect("/booking");
};
