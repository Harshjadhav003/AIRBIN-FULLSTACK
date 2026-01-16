const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware");
const bookingController = require("../controllers/booking");

// ✅ test route (ALWAYS TOP)
router.get("/test", (req, res) => {
  res.send("BOOKING ROUTE WORKING");
});

// show all bookings
router.get("/", isLoggedIn, bookingController.showBookings);

// show single booking (ALWAYS AFTER /)
router.get("/:id", isLoggedIn, bookingController.showSingleBooking);

// create booking
router.post("/:id", isLoggedIn, bookingController.createBooking);

// delete booking
router.delete("/:id", isLoggedIn, bookingController.deleteBooking);

module.exports = router;
